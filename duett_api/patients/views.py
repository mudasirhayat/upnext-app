import io
import os

import zipcodes
from datetime import datetime
from django.conf import settings
from django.http import HttpResponseNotFound, Http404, request, HttpResponse
from django.shortcuts import get_object_or_404
from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.pdfgen.canvas import Canvas
from reportlab.platypus import SimpleDocTemplate, Spacer, Paragraph, Table, TableStyle, Image, PageTemplate
from rest_framework import status, viewsets, mixins
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from django.db.models import Q, Prefetch
from django.contrib.sites.models import Site
from django.utils import timezone
from duett_api.users.models import User
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter
# from reportlab.lib import colors
# from reportlab.lib.styles import getSampleStyleSheet
# from reportlab.lib.pagesizes import letter, landscape   
# from reportlab.lib.units import inch
# from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
# from django.http import HttpResponse
# import io

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count, F, Prefetch, Value, Q, Case, When, Value, CharField
from rest_framework.decorators import action

from .filters import (
    PatientRequestFilterBackend,
    PatientFilterBackend,
    PatientRequestFilterSet,
    RequestNotesFilterBackend,
    PatientRequestOrderingFilter
)
from .models import (
    EmailData,
    Patient,
    PatientRequest,
    ServiceRequested,
    RequestNotes,
    TableColumns,
    ArchivedDeletePatientRequest,
    PatientActivity
)
from duett_api.users.models import Account, ProviderProfile, User
from .serializers import (
    AgencyPatientRequestGetSerializer,
    ArchivedDeletePatientRequestSerializer,
    PatientRequestUpdateSerializer,
    AgencyPatientSerializer,
    ProviderPatientRequestGetSerializer,
    RequestNotesSerializer,
    ServiceRequestedPostSerializer,
    TableColumnsSerializer,
    RequestActivitySerializer
)
from .permissions import (
    PatientPermissions,
    PatientRequestPermissions,
    AgencyOnly,
    ProviderOnly,
    RequestNotesPermissions,
    ServiceMatchPermissions,
    ProviderMatchPermissions,
    AgencyManagerOnly
)
from duett_api.patients.utils import insert_patient_activity, REQUEST_EVENT


@permission_classes([IsAuthenticated, PatientPermissions])
class PatientViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Patient.objects.all()
    serializer_class = AgencyPatientSerializer

    filter_backends = (
        PatientFilterBackend,
        SearchFilter,
        OrderingFilter,
        DjangoFilterBackend,
    )
    search_fields = ("first_name", "last_name", "email")
    ordering_fields = (
        "first_name",
        "last_name",
        "zip",
        "state",
        "gender",
    )
    ordering = ("last_name", "first_name")
    filterset_fields = (
        "first_name",
        "last_name",
        "zip",
        "state",
        "gender",
        "email",
    )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data={
                "created_by": request.user.account.agencyprofile.pk,
                **request.data,
            }
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


@permission_classes([IsAuthenticated, PatientRequestPermissions])
class PatientRequestViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    This viewset is for endpoint `/api/requests/`
    and will return all patients that the user is authorized
    to see.
    This viewset is not meant for creating new PatientRequest objects.
    Use CreateRequestView for creating new requests, because it uses
    `/api/patients/:id/requests/` to associate the request with a patient.
    """

    queryset = PatientRequest.objects.all()

    filter_backends = (
        PatientRequestFilterBackend,
        # PatientRequestSearchFilter,
        OrderingFilter,
        DjangoFilterBackend,
    )

    ordering_fields = (
        "id",
        "equipment",
        "smoking",
        "pets",
        "status",
        "request_prior_authorization",
        "transportation_required",
        "patient__first_name",
        "patient__last_name",
        "patient__zip",
        "created_by__userprofile__last_name",
        "refreshed_time",
        "patient__created_by__account__name",
    )
    ordering = ("-refreshed_time",)
    filterset_class = PatientRequestFilterSet

    def get_queryset(self):
        queryset = PatientRequest.objects.all()
        account = self.request.user.account
        if account.type == Account.Types.Provider:
            return queryset
        else:
            queryset = queryset.annotate(
                display_status=Case(
                    When(is_archived=PatientRequest.Archived.ARCHIVED, then=Value("Archived")),
                    When(status=PatientRequest.Statuses.OPEN, then=Value("Open")),
                    When(status=PatientRequest.Statuses.CLOSED, then=Value("Matched")),
                    When(status=PatientRequest.Statuses.PENDING, then=Value("Submissions Received")),
                    When(status=PatientRequest.Statuses.PARTIALLY_MATCHED, then=Value("Partially Matched")),
                    default=Value("Open"),
                    output_field=CharField()
                )
            )
        return queryset

    def filter_queryset(self, *args, **kwargs):
        queryset = super(PatientRequestViewSet, self).filter_queryset(*args, **kwargs)
        if self.action == "list":
            queryset = self._modify_queryset(queryset)
        return queryset

    def _modify_queryset(self, queryset):
        account = self.request.user.account
        if account.type == Account.Types.Provider:
            provider_profile = account.providerprofile
            qs = queryset
            # Todo: As of now 3 query is firing at backend, tried to use annotate But annotate was giving duplicate
            #  records. Some more optimization scope can be done.
            qs0 = qs.filter(is_archived=PatientRequest.Archived.ARCHIVED).annotate(
                display_status=Value('Archived', output_field=CharField()))
            lst_id_qs0 = qs0.values_list("id", flat=True)

            qs1 = qs.exclude(id__in=lst_id_qs0).filter(servicerequested__match__pk=provider_profile.pk).annotate(
                display_status=Value('Matched', output_field=CharField()))

            lst_id_qs1 = qs1.values_list("id", flat=True)

            qs2 = qs.filter(servicerequested__interests__pk=provider_profile.pk).exclude(id__in=lst_id_qs1).annotate(
                display_status=Value('Submitted', output_field=CharField()))

            lst_id_qs2 = qs2.values_list("id", flat=True)

            qs3 = qs.exclude(id__in=lst_id_qs1).exclude(id__in=lst_id_qs2).annotate(
                display_status=Value('New', output_field=CharField()))

            qs = qs1.union(qs2).union(qs3)

            # This is a temp fix/hack , which is to create patient_request : status has map and add that in the request
            # so it can be accessed in the serializer
            patient_request_status_map = {}
            for patient_request in qs:
                patient_request_status_map[patient_request.id] = patient_request.display_status

            self.request.patient_request_status_map = patient_request_status_map

        queryset = PatientRequestOrderingFilter().filter_queryset(self.request, queryset, self)

        return queryset

    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return PatientRequestUpdateSerializer
        is_provider = self.request.user.account.type == Account.Types.Provider
        return (
            ProviderPatientRequestGetSerializer
            if is_provider
            else AgencyPatientRequestGetSerializer
        )

    def get_serializer_context(self):
        context = super(PatientRequestViewSet, self).get_serializer_context()
        context.update({"request": self.request})
        return context

    def destroy(self, request, *args, **kwargs):
        patient_request_obj = self.get_object()
        serializer = ArchivedDeletePatientRequestSerializer(
            data={
                "request": patient_request_obj.id,
                "created_by": request.user.pk,
                "is_type": ArchivedDeletePatientRequest.AcrhivedDelType.DELETED,
                **request.data,
            }
        )
        serializer.is_valid(raise_exception=True)
        patient_request_obj.save()
        serializer.save()
        self.perform_destroy(patient_request_obj)
        return Response(status=status.HTTP_204_NO_CONTENT)


@permission_classes([IsAuthenticated, AgencyOnly])
class CreatePatientRequestView(APIView):
    """
    Agency can create a request for a specific patient
    they must be the owner of that patient record
    """

    http_method_names = ["post"]

    def post(self, request, patient_pk):
        patient = get_object_or_404(Patient, pk=patient_pk)

        if patient.created_by == request.user.account.agencyprofile:
            patient_request = PatientRequest.objects.create(
                patient=patient, created_by=request.user, **request.data
            )

            serializer = AgencyPatientRequestGetSerializer(patient_request)
            message = REQUEST_EVENT.get(1)
            message = message.format(created_by_name=request.user.userprofile.full_name)
            insert_patient_activity(message, request.user, patient_request)
            return Response(serializer.data, status.HTTP_201_CREATED)

        return Response("Bad request", status.HTTP_400_BAD_REQUEST)


class RetrieveUpdatePatientRequestView(RetrieveUpdateAPIView):
    serializer_class = AgencyPatientRequestGetSerializer
    permission_classes = (
        IsAuthenticated,
        AgencyOnly,
    )

    def get_object(self):
        try:
            return PatientRequest.objects.get(pk=self.kwargs["request_pk"])
        except PatientRequest.DoesNotExist:
            raise Http404

    def put(self, request, *args, **kwargs):
        # TODO try to update this later with serializer.
        instance = self.get_object()
        instance.patient_id = self.kwargs["patient_pk"]
        instance.equipment = request.data.get("equipment")
        instance.notes = request.data.get("notes")
        instance.pets = request.data.get("pets")
        instance.request_prior_authorization = request.data.get(
            "request_prior_authorization"
        )
        instance.smoking = request.data.get("smoking")
        instance.requested_schedule = request.data.get("requested_schedule")
        instance.transportation_required = request.data.get(
            "transportation_required"
        )
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, RequestNotesPermissions])
class RequestNotesViewSet(viewsets.ModelViewSet):
    queryset = RequestNotes.objects.all().prefetch_related(
        Prefetch('histories', queryset=RequestNotes.history.order_by('-history_date'), to_attr='history'))
    serializer_class = RequestNotesSerializer

    filter_backends = (
        RequestNotesFilterBackend,
        SearchFilter,
    )
    search_fields = ("body",)
    ordering = ("updated_at",)

    def create(self, request, request_pk, *args, **kwargs):
        serializer = self.get_serializer(
            data={
                "request": request_pk,
                "author": request.user.pk,
                "account": request.user.account.id,
                **request.data,
            }
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


@permission_classes([IsAuthenticated, AgencyOnly])
class ServiceRequestedViewSet(viewsets.ModelViewSet):
    queryset = ServiceRequested.objects.all()
    serializer_class = ServiceRequestedPostSerializer

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get("data", {}), list):
            kwargs["many"] = True

        return super().get_serializer(*args, **kwargs)

    def list(self, request, request_pk):
        p = PatientRequest.objects.get(pk=request_pk)
        queryset = p.servicerequested_set.all()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def update(self, request, request_pk, pk):
        # TODO try to update this later with serializer. in fact we might not
        # need to update it with serializer since we are using viewset.
        # updating serializers fields will solve the problem
        # for the time being couldn't manage to update this with serializer
        try:
            instance = self.queryset.get(pk=self.kwargs.get("pk"))
            instance.service_id = request.data.get("service")
            instance.funding_source_id = request.data.get("funding_source")
            instance.frequency = request.data.get("frequency")
            instance.hours = request.data.get("hours")
            instance.requested_schedule = request.data.get(
                "requested_schedule"
            )
            instance.save()
            serializer = self.get_serializer(instance)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@permission_classes([IsAuthenticated, ProviderOnly])
class ServiceInterestCreateView(APIView):
    """
    Providers can show interest in a group of ServiceRequests
    """

    def post(self, request):
        with transaction.atomic():
            services_ids = request.data.get("services")
            if not services_ids:
                return HttpResponseNotFound(
                    "Must provide IDs of the services."
                )
            provider = get_object_or_404(
                ProviderProfile, pk=request.user.account
            )
            services = ServiceRequested.objects.filter(id__in=services_ids).exclude(
                status=ServiceRequested.Statuses.CLOSED)
            if not services.exists():
                return HttpResponseNotFound(
                    "Service Request is already matched or closed."
                )

            for service in services:
                # We must add the provider to the service for the m2m_changed
                # signal to fire correctly
                service.interests.add(provider)
                service.status = ServiceRequested.Statuses.PENDING
                message = REQUEST_EVENT.get(2)
                message = message.format(provider_name=provider.account.name)
                insert_patient_activity(message, request.user, service.request)
                service.save()

            return Response("Success", status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated, ProviderOnly])
class ServiceInterestCancelView(APIView):
    """
    Providers can cancel interest in a ServiceRequest
    """

    def post(self, request, service_pk):
        service = get_object_or_404(ServiceRequested, id=service_pk)
        provider = get_object_or_404(ProviderProfile, pk=request.user.account)
        provider.interested_services.remove(service)
        if not service.interests.count() and not service.match:
            service.status = ServiceRequested.Statuses.OPEN
            service.save()
        return Response("Success", status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated, ServiceMatchPermissions])
class ServiceMatchCreateView(CreateAPIView):
    """
    This is for care managers to match a provider to a service request
    """

    def post(self, request, provider_pk):
        service_ids = request.data.get("services")

        if not service_ids:
            return HttpResponseNotFound(
                "Must provide IDs of services to match."
            )

        provider = get_object_or_404(ProviderProfile, account_id=provider_pk)
        try:
            services = ServiceRequested.objects.filter(id__in=service_ids)
            for service in services:
                service.match = provider
                service.match_date = datetime.now()
                service.status = ServiceRequested.Statuses.CLOSED
                service.save()
                message = REQUEST_EVENT.get(3)
                message = message.format(service_name=service.service.name)
                insert_patient_activity(message, request.user, service.request)
                self.send_email_closed(service, provider)
            return Response("Success", status=status.HTTP_201_CREATED)
        except ObjectDoesNotExist:
            return HttpResponseNotFound("Service not found.")

    def send_email_closed(self, sr, provider_matched):
        current_site = Site.objects.get_current()
        domain_name = f"https://{current_site.domain}"

        if Site.objects.filter(domain="qa.app.duett.io"):
            env_label = "QA:"
        elif Site.objects.filter(domain="staging.app.duett.io"):
            env_label = "STG:"
        else:
            env_label = ""

        request_id = sr.request.id
        for provider in sr.interests.all().exclude(pk=provider_matched.pk):
            email = provider.email
            html_message = render_to_string(
                "provider-request-closed-email.html",
                {
                    "request_list_url": domain_name,
                    "domain_name": domain_name,
                    "request_id": request_id,
                },
            )
            message = EmailMessage(
                f"{env_label} Request Update: Closed",
                html_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            message.content_subtype = "html"
            message.send()


@permission_classes([IsAuthenticated, ProviderOnly, ProviderMatchPermissions])
class RemoveProviderMatchViewSet(APIView):
    """
    This is for providers to remove themselves as a match.
    """

    def post(self, request, service_pk):
        service = get_object_or_404(ServiceRequested, pk=service_pk)
        service.match = None
        service.save()

        # Send email to care manager to notify them:
        email = service.request.created_by.email
        current_site = Site.objects.get_current()

        id = service.request.id
        url = f"https://{current_site.domain}/request/{id}/"
        html_message = render_to_string(
            "remove-match-email.html",
            {"request_url": url, "provider": request.user.account.name},
        )

        message = EmailMessage(
            "A request match has been removed",
            html_message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
        )
        message.content_subtype = "html"
        message.send()

        return Response("Success")


@permission_classes([IsAuthenticated, ProviderOnly])
class ProviderHideView(APIView):
    """
    Providers can hide a PatientRequest
    """

    def post(self, request, request_pk):
        patient_request = get_object_or_404(PatientRequest, pk=request_pk)
        provider = get_object_or_404(ProviderProfile, pk=request.user.account)
        patient_request.hides.add(provider)
        return Response("Success", status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated, ProviderOnly])
class ProviderUnhideView(APIView):
    def post(self, request, request_pk):
        patient_request = get_object_or_404(PatientRequest, pk=request_pk)
        provider = get_object_or_404(ProviderProfile, pk=request.user.account)
        patient_request.hides.remove(provider)
        return Response("Success", status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, PatientRequestPermissions])
class ArchiveView(mixins.UpdateModelMixin,
                  viewsets.GenericViewSet):
    """
    Archive PatientRequest
    """
    queryset = PatientRequest.objects.filter(is_archived=PatientRequest.Archived.NOT_ARCHIVED)

    filter_backends = (
        PatientRequestFilterBackend,
    )

    def update(self, request, pk):
        patient_request_obj = self.get_object()
        serializer = ArchivedDeletePatientRequestSerializer(
            data={
                "request": patient_request_obj.id,
                "created_by": request.user.pk,
                "is_type": ArchivedDeletePatientRequest.AcrhivedDelType.ARCHIVED,
                **request.data,
            }
        )
        serializer.is_valid(raise_exception=True)
        patient_request_obj.is_archived = PatientRequest.Archived.ARCHIVED
        patient_request_obj.save()
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, PatientRequestPermissions])
class UnArchiveView(
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet):
    """
    UnArchive PatientRequest
    """

    queryset = PatientRequest.objects.filter(is_archived=PatientRequest.Archived.ARCHIVED)

    filter_backends = (
        PatientRequestFilterBackend,
    )

    def update(self, request, pk):
        patient_request_obj = self.get_object()

        patient_request_obj.is_archived = PatientRequest.Archived.NOT_ARCHIVED
        patient_request_obj.save()
        return Response({"message": "success"}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class TableColumnsView(APIView):
    """
    Users can get list of table columns to display in tables in
    front-end.
    """

    def get(self, request):
        account = request.user.account
        table_name = request.GET.get("table")
        queryset = TableColumns.objects.filter(
            Q(role=None) | Q(role=(account.type if account != None else None)),
            table_name=table_name,
            # this column_type query will have to be updated when
            # we want to support custom table columns
            column_type=TableColumns.ColumnTypes.DEFAULT,
        ).order_by("sequence")
        serializer = TableColumnsSerializer(queryset, many=True)
        return Response(serializer.data)


@permission_classes([IsAuthenticated])
class ZipcodeAPIView(APIView):
    def get(self, request, zipcode):
        if zipcodes.is_real(zipcode):
            return Response(zipcodes.matching(zipcode))
        return Response({"message": "Zip code not found"})


@permission_classes([IsAuthenticated, AgencyManagerOnly])
class ServiceReOpenAPIView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager)  can reopen
    """

    def post(self, request, request_pk, service_pk):
        patient_req = get_object_or_404(PatientRequest, id=request_pk)
        service = get_object_or_404(ServiceRequested, id=service_pk)
        provider_id = request.data.get('provider_id')
        if not provider_id:
            return Response({"error": "Please provide Provider ID"}, status=status.HTTP_400_BAD_REQUEST)
        patient_req.status = patient_req.history.last().status
        patient_req.save()
        if int(service.status) == 3:  # move to notify state from Matched
            service.match = None
        if int(service.status) > 1:
            service.status = int(service.status) - 1
        if service.status == 1:
            provider = get_object_or_404(ProviderProfile, pk=provider_id)
            provider.interested_services.remove(service)
        message = REQUEST_EVENT.get(5)
        message = message.format(service_name=service.service.name)
        insert_patient_activity(message, request.user, service.request)
        service.save()
        return Response("Success", status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated, AgencyManagerOnly])
class ServiceRequestDeleteAPIView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager) can delete
    """

    def delete(self, request, request_pk, service_pk):
        patient_req = get_object_or_404(PatientRequest, id=request_pk)
        service = get_object_or_404(ServiceRequested, id=service_pk)
        total_service = patient_req.servicerequested_set.count()
        deleted_ser_count = patient_req.servicerequested_set.filter(is_delete=1).count()
        remain_service = total_service - deleted_ser_count
        if remain_service <= 1:
            patient_req.delete()
        else:
            message = REQUEST_EVENT.get(4)
            message = message.format(service_name=service.service.name)
            insert_patient_activity(message, request.user, service.request)
            service.is_delete = 1
            if request.data:
                service.reason = request.data.get('reason')
                service.message = request.data.get('message')
            service.save()
        return Response("Success", status=status.HTTP_204_NO_CONTENT)


@permission_classes([IsAuthenticated, AgencyManagerOnly])
class ServiceRequestReAssignAPIView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager) can reassign
    """

    def post(self, request, request_pk, service_pk):
        patient_req = get_object_or_404(PatientRequest, id=request_pk)
        service = get_object_or_404(ServiceRequested, id=service_pk)
        provider_id = request.data.get('provider_id')
        if not provider_id:
            return Response({"error": "Please provide Provider ID"}, status=status.HTTP_400_BAD_REQUEST)
        provider = get_object_or_404(ProviderProfile, pk=provider_id)
        service.match = provider
        service.save()
        message = REQUEST_EVENT.get(6)
        message = message.format(service_name=service.service.name, provider_name=provider.account.name)
        insert_patient_activity(message, request.user, service.request)
        self.send_email_closed(service, provider)
        return Response("Success", status=status.HTTP_200_OK)

    def send_email_closed(self, sr, provider_matched):
        current_site = Site.objects.get_current()
        domain_name = f"https://{current_site.domain}"

        if Site.objects.filter(domain="qa.app.duett.io"):
            env_label = "QA:"
        elif Site.objects.filter(domain="staging.app.duett.io"):
            env_label = "STG:"
        else:
            env_label = ""

        request_id = sr.request.id
        for provider in sr.interests.all().exclude(pk=provider_matched.pk):
            email = provider.email
            html_message = render_to_string(
                "provider-request-closed-email.html",
                {
                    "request_list_url": domain_name,
                    "domain_name": domain_name,
                    "request_id": request_id,
                },
            )
            message = EmailMessage(
                f"{env_label} Request Update: Closed",
                html_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            message.content_subtype = "html"
            message.send()


@permission_classes([IsAuthenticated, AgencyManagerOnly])
class ServiceProviderListAPIView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager) can get provider list
    """

    def get(self, request, request_pk, service_pk):
        patient_req = get_object_or_404(PatientRequest, id=request_pk)
        service = get_object_or_404(ServiceRequested, id=service_pk)
        provider_list = service.interests.all()
        res = []
        for provider in provider_list:
            if service.match_id != provider.account.id:
                res.append({"id": provider.account.id, "name": provider.account.name})
        return Response({"data": res}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated, AgencyManagerOnly])
class PatientRequestActivityAPIView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager) can get activity list
    """

    def get(self, request, request_pk, ):
        patient_req = get_object_or_404(PatientRequest, id=request_pk)
        activity_list = PatientActivity.objects.filter(object_id=request_pk).order_by('-id')
        data = RequestActivitySerializer(activity_list, many=True).data
        return Response({"data": data}, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class PatientRequestAssignView(APIView):
    """
    Only (Care Agency Admin,Care Manager Supervisor,Care Manager) can get activity list
    """

    def get(self, request, request_pk, ):
        patient_req = get_object_or_404(PatientRequest, pk=request_pk)
        user_account = patient_req.assigned_to
        agency_name = user_account.account.name
        account = Account.objects.get(name=agency_name)
        users = account.user_set.all()
        user_list = list(users)
        data = []
        emptylist = []
        for user in user_list:
            try:
                if user_account != user:
                    data.append(
                        {'user_id': user.pk, 'agency_name': user.userprofile.first_name + " " + user.userprofile.last_name})
            except Exception as e:
                emptylist.append(user)
                print('empty user list',e)
        return Response({"data": data}, status=status.HTTP_200_OK)


class PatientRequestChangeAssigneeView(APIView):
    def post(self, request, request_pk, pk):
        current_user = request.user
        patient_req = get_object_or_404(PatientRequest, pk=request_pk)
        user = User.objects.get(pk=pk)
        current_CM = patient_req.assigned_to
        patient_req.assigned_to = user
        if current_user.group in ['Care Agency Admin', 'Care Manager Supervisor']:
            if current_user != current_CM:
                self.email_send_to_current_CM(request_pk, current_CM.email, user.userprofile.first_name,
                                              user.userprofile.last_name)
                self.email_sent_to_new_CM(request_pk, user.email, current_user.userprofile.first_name, current_user.userprofile.last_name)
            else:
                self.email_sent_to_new_CM(request_pk, user.email, current_user.userprofile.first_name,
                                          current_user.userprofile.last_name)
        else:
            self.email_sent_to_new_CM(request_pk, user.email, current_user.userprofile.first_name,
                                      current_user.userprofile.last_name)
        patient_req.save()
        return Response(status=status.HTTP_200_OK)

    def email_send_to_current_CM(self,id,email,f_name,l_name):
        current_site = Site.objects.get_current()
        url = f"https://{current_site.domain}/request/{id}"
        html_message = render_to_string(
           "forwarded-request.html", {"request_url": url,"AssigningUserFirstName":f_name,"AssigningUserLastName":l_name}
        )
        message = EmailMessage(
           "Your Care Request has been re-assigned",
           html_message,
           settings.DEFAULT_FROM_EMAIL,
           [email],
        )
        message.content_subtype = "html"
        message.send()
    def email_sent_to_new_CM(self,id,email,f_name,l_name):
        current_site = Site.objects.get_current()
        url = f"https://{current_site.domain}/request/{id}"
        html_message = render_to_string(
           "new_assignee-cm-request.html", {"request_url": url,"AssigningUserFirstName":f_name,"AssigningUserLastName":l_name}
        )
        message = EmailMessage(
           "You have been assigned a Care Request",
           html_message,
           settings.DEFAULT_FROM_EMAIL,
           [email],
        )
        message.content_subtype = "html"
        message.send()


class PatientRequestDownloadPdfView(APIView):
    def format_frequency(self, frequency):
        ret = ""
        if frequency == "Per Week":
            ret = "week"
        elif frequency == "Per Month":
            ret = "month"
        else:
            ret = "week"
        return ret

    def P(self, txt):
        style = getSampleStyleSheet()['Normal']
        return Paragraph(txt, style)

    def get(self, request, request_pk):
        buffer = io.BytesIO()
        response = PatientRequest.objects.get(id=request_pk)
        serializer = AgencyPatientRequestGetSerializer(response, context={"request": self.request})
        f_name = serializer.data['care_manager']['userprofile']['first_name']
        l_name = serializer.data['care_manager']['userprofile']['last_name']
        CM_phone = serializer.data['care_manager']['userprofile']['phone']
        CM_email = serializer.data['care_manager']['email']
        CM_name = f_name + " " + l_name
        CR_id = serializer.data['id']
        interests = serializer.data['interests']
        data = [
            ['Provider Name', 'Provider Email', 'Provider Phone', 'Funding Source', 'Service', 'Hours']]
        for i in interests:
            account = i['account']
            services = i['services']
            for j in services:
                data_list = []
                data_list.append(self.P(account['name']))
                data_list.append(self.P(i['email']))
                data_list.append(self.P(i['phone']))
                data_list.append(self.P(j['funding_source']))
                data_list.append(self.P(j['service']))
                data_list.append(f"{j['hours']} hours / {self.format_frequency(j['frequency'])}")
                data.append(data_list)
        pdf = SimpleDocTemplate(buffer, pagesize=landscape(A4), title=f"{CM_name}", author=f"{CM_name}")
        additional_data = [
            f'<font color="black"><strong>Care Manager: {CM_name}</strong></font>',
            f'<font color="black"><strong>Email: {CM_email}</strong></font>',
            f'<font color="black"><strong>Phone Number: {CM_phone}</strong></font>',
            f'<font color="black"><strong>Case ID: {CR_id}</strong></font>',
            '', ''
        ]
        style = getSampleStyleSheet()['Normal']
        style.leftIndent = -20

        col_widths = [120, 160, 110, 120, 120, 100]
        # create the table with fixed width columns
        table = Table(data, colWidths=col_widths)
        table.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('FONTSIZE', (0, 0), (-1, 0), 12),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('BACKGROUND', (0, 1), (-1, -1), colors.white),
            ('TEXTCOLOR', (0, 1), (-1, -1), colors.black),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('ALIGN', (0, 1), (-1, -1), 'LEFT'),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 10),
        ]))
        elements = []

        logo_path = os.path.join('duett_api', 'static', 'images', 'Duett_FullColor_logo.png')
        logo_height = 50
        logo_width = logo_height / Image(logo_path).imageHeight * Image(
            logo_path).imageWidth

        elements.append(Spacer(1, 0.05 * inch))
        elements.append(Image(logo_path, width=logo_width, height=logo_height, hAlign='RIGHT'))
        elements.append(Spacer(1, 0.25 * inch))

        for text in additional_data:
            elements.append(Paragraph(text, style))
            elements.append(Spacer(1, 0.1 * inch))
        elements.append(table)
        pdf.build(elements)
        buffer.seek(0)
        return HttpResponse(buffer, content_type='application/pdf')