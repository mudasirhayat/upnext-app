import random
from django.shortcuts import get_object_or_404
from django.http import Http404
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, mixins
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import permission_classes, action
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, F, Prefetch, Value, Q, Case, When, Value, CharField
from django.conf import settings
from datetime import datetime, timezone, timedelta
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
import pyotp
from .filters import AngencyRequestsFilterBackend, UserFilterBackend
from .models import (
    UserProfile,
    AgencyProfile,
    ProviderProfile,
    AgencyManagedUser,
    UserPreferences, TwoFactorAuthentication,
)
from .serializers import (
    UserProfileSerializer,
    UserSerializer,
    AgencyProfileSerializer,
    ProviderProfileSerializer,
    AgencyManagedUserSerializer,
    UserPreferencesSerializer,
)
from .permissions import (
    AdminOnly,
    AgencyPermissions,
    ProviderPermissions,
    UserPermissions,
    UserProfilePermissions,
    AgencyAdminOnly,
    AgencyManagedUserPermissions,
    AgencyRequestsPermissions,
    UserPreferencesPermissions,
)
from duett_api.patients.models import Patient, PatientRequest
from duett_api.patients.serializers import (
    AgencyPatientSerializer,
    AgencyPatientRequestGetSerializer,
)
from duett_api.patients.filters import PatientRequestFilterSet, PatientRequestOrderingFilter


@permission_classes([IsAuthenticated, UserPermissions])
class UserViewSet(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    filter_backends = (
        UserFilterBackend,
        #SearchFilter,
        OrderingFilter,
        DjangoFilterBackend,
    )

    search_fields = (
        "email",
        "userprofile__first_name",
        "userprofile__last_name",
        "groups__name",
    )

    ordering_fields = (
        "created_at",
        "email",
        "groups__name",
        "is_active",
        "updated_at",
        "userprofile__first_name",
        "userprofile__last_name",
    )

    def get_valid_date(self, param):
        try:
            return datetime.strptime(param, "%m/%d/%Y").strftime('%Y-%m-%d')
        except:
            pass

    def add_query(self, request):
        terms = request.GET.get('search').lower()
        valid_date = self.get_valid_date(terms)
        query = Q()
        if not valid_date:
            term_list = terms.split(' ')
            query = Q(email__icontains=term_list[0]) | Q(groups__name__icontains=term_list[0]) | Q(userprofile__last_name__icontains=term_list[0]) | Q(userprofile__first_name__icontains=term_list[0])
            for term in term_list[1:]:
               query.add(Q(), Q.AND)
               query.add((Q(email__icontains=term) | Q(groups__name__icontains=term) | Q(userprofile__last_name__icontains=term) | Q(userprofile__first_name__icontains=term)), query.connector)
            if terms == 'inactive':
                query.add(Q(is_active=False), Q.OR)
            elif terms == 'active':
                query.add(Q(is_active=True), Q.OR)
        else:
            query.add(Q(created_at__date=valid_date), Q.OR)
            query.add(Q(updated_at__date=valid_date), Q.OR)
        return query

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        query = self.add_query(request)
        queryset = queryset.filter(query)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = get_user_model().objects.all()
        user = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(request, user)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    @action(detail=True)
    def groups(self, request, pk=None):
        """
        Returns a list of all the group names that the given
        user belongs to.
        In the application so far, there should only be one
        group per user.
        """
        user = self.get_object()
        user_groups = user.groups.all()
        return Response([group.name for group in user_groups])


@permission_classes([IsAuthenticated, UserProfilePermissions])
class UserProfileView(APIView):
    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        profile = self.get_object(pk)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        profile = self.get_object(pk)
        serializer = UserProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AboutMeView(APIView):
    def get(self, request):
        try:
            serializer = UserSerializer(request.user)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                "User does not exists.",
                status=status.HTTP_401_UNAUTHORIZED,
            )


@permission_classes([IsAuthenticated, AgencyPermissions])
class AgencyViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = AgencyProfile.objects.all()
    serializer_class = AgencyProfileSerializer


@permission_classes([IsAuthenticated, AgencyPermissions])
class AgencyPatientsViewSet(viewsets.ViewSet):
    def list(self, request, agency_pk):
        queryset = Patient.objects.filter(created_by=agency_pk)
        serializer = AgencyPatientSerializer(queryset, many=True)
        return Response(serializer.data)


@permission_classes([IsAuthenticated, ProviderPermissions])
class ProviderViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet
):
    queryset = ProviderProfile.objects.all()
    serializer_class = ProviderProfileSerializer


@permission_classes(
    [IsAuthenticated, AgencyAdminOnly, AgencyManagedUserPermissions]
)
class AgencyManagedUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def list(self, request):
        # Get list of users managed by a particular user
        users = self.queryset.filter
    user_pk is for the supervisor's user id.
    """

    queryset = AgencyManagedUser.objects.all()
    serializer_class = AgencyManagedUserSerializer

    def list(self, request, user_pk):
        users = AgencyManagedUser.objects.filter(supervisor=user_pk)
        serializer = AgencyManagedUserSerializer(users, many=True)
        return Response(serializer.data)

    def create(self, request, user_pk):
        """
        Must pass in user_id of managed user in the request body.
        """
        user = get_object_or_404(get_user_model(), pk=request.data["user_id"])
        supervisor = get_object_or_404(get_user_model(), pk=user_pk)

        # check that user and supervisor are with the same account
        if user.account == supervisor.account:
            managed_user, created = AgencyManagedUser.objects.get_or_create(
                supervisor=supervisor, managed_user=user
            )
            serializer = AgencyManagedUserSerializer(managed_user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(
            "Unable to manage user", status=status.HTTP_400_BAD_REQUEST
        )


@permission_classes([IsAuthenticated, AgencyPermissions])
class AgencyUsersViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    Agency users can pull the list of other users from
    their own agency.
    """

    def list(self, request, agency_pk):
        if request.user.account.id == int(agency_pk):
            profiles = UserProfile.objects.filter(user__account=agency_pk)
            serializer = UserProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        return Response(
            "Can only retrieve users from own agency.",
            status=status.HTTP_401_UNAUTHORIZED,
        )


@permission_classes(
    [IsAuthenticated, AgencyPermissions, AgencyRequestsPermissions]
)
class AgencyRequestsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    Agency users can pull a list of all requests from
    their own agency.
    """

    serializer_class = AgencyPatientRequestGetSerializer

    filter_backends = (
        AngencyRequestsFilterBackend,
        OrderingFilter,
        SearchFilter,
        DjangoFilterBackend,
        PatientRequestOrderingFilter,
    )
    filterset_class = PatientRequestFilterSet

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
    # search_fields = (
    #     "patient__first_name",
    #     "patient__last_name",
    #     "patient__zip",
    # )
    ordering = "-refreshed_time"

    def get_queryset(self):
        queryset = PatientRequest.objects.all()
        queryset = queryset.annotate(
            display_status=Case(
When(is_archived=PatientRequest.Archived.ARCHIVED, then=Value("Archived")),
                When(status=PatientRequest.Statuses.OPEN, then=Value("Open")),
                default=Value("Unknown"))
                When(status=PatientRequest.Statuses.CLOSED, then=Value("Matched")),
                When(status=PatientRequest.Statuses.PENDING, then=Value("Submissions Received")),
                When(status=PatientRequest.Statuses.PARTIALLY_MATCHED, then=Value("Partially Matched")),
                default=Value("Open"),
                output_field=CharField()
            )
        )
        return queryset


@permission_classes([IsAuthenticated, AdminOnly])
class DeactivateUsersView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        user_ids = request.data.get("user_ids")
        if not user_ids:
            raise Exception("You must provide a list of user IDs")

        get_user_model().objects.filter(
            account=request.user.account, id__in=user_ids
        ).exclude(id=request.user.id).update(is_active=False)

        return Response("Success", status.HTTP_200_OK)


@permission_classes([IsAuthenticated, AdminOnly])
class ActivateUsersView(APIView):
    http_method_names = ["post"]

    def post(self, request):
        user_ids = request.data.get("user_ids")
        if not user_ids:
            raise Exception("You must provide a list of user IDs")

        get_user_model().objects.filter(
            account=request.user.account, id__in=user_ids
        ).update(is_active=True)

        return Response("Success", status.HTTP_200_OK)


@permission_classes([IsAuthenticated, UserPreferencesPermissions])
class UserPreferencesView(APIView):
    def post(self, request, pk):
        request_table_columns = request.data["request_table_columns"]
        user = get_object_or_404(get_user_model(), pk=pk)
        obj, created = UserPreferences.objects.update_or_create(
            user=user,
            defaults={"request_table_columns": request_table_columns},
        )
        serializer = UserPreferencesSerializer(obj)
        if created:
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.data)

    def get(self, request, pk):
        obj = get_object_or_404(UserPreferences, user=pk)
        serializer = UserPreferencesSerializer(obj)
        return Response(serializer.data)


def is_valid_phone_number(phone_number):

    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN

    try:
        client = Client(account_sid, auth_token)
        response = client.lookups.phone_numbers(f"+1{phone_number}").fetch(type='carrier')
        return True
    except TwilioRestException as e:
        return False




@permission_classes([IsAuthenticated])
class ConfigureOTP(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            user = get_object_or_404(get_user_model(), pk=user_id)
            phone_number = request.data.get('phone_number')
            account_sid = settings.TWILIO_ACCOUNT_SID
            auth_token = settings.TWILIO_AUTH_TOKEN
            twilio_phone_number = settings.TWILIO_PHONE_NUMBER

            otp_obj = TwoFactorAuthentication.objects.get(user=user)
            if not phone_number:
                phone_number = otp_obj.phone_number
        except TwoFactorAuthentication.DoesNotExist:
            pass

        if not phone_number:
            return Response({'error': 'Phone number is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if not is_valid_phone_number(phone_number):
            return Response({'error': 'Please enter a valid US number'}, status=status.HTTP_400_BAD_REQUEST)
        # Continue with the rest of your code for generating OTP and sending SMS
        otp = str(random.randint(0, 999999)).zfill(6)
        expiration = datetime.now(timezone.utc) + timedelta(seconds=300)

        otp_obj, _ = TwoFactorAuthentication.objects.update_or_create(
            user=user,
            defaults={
                'otp_code': otp,
                'otp_expiration': expiration,
                'phone_number': phone_number,
                'last_configured_2fa': datetime.now(timezone.utc),
            }
        )

        # Send OTP via Twilio SMS
        try:
            client = Client(account_sid, auth_token)
            message = client.messages.create(
                body=f'Your 6-digit code for verification is: {otp}',
                from_=twilio_phone_number,
                to=f"+1{phone_number}"
            )
        except TwilioRestException as e:
            return Response({'error': 'Failed to send OTP via SMS.'}, status=status.HTTP_400_BAD_REQUEST)

        response_data = {
            'status': 'success',
            'expiration': expiration
        }

        return Response(response_data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class VerifyOTP(APIView):
    def post(self, request):
        try:
            user_id = request.data.get('user_id')
            user_otp = request.data.get('otp')

            user = get_object_or_404(get_user_model(), pk=user_id)
            otp_obj = TwoFactorAuthentication.objects.get(user=user)
        except TwoFactorAuthentication.DoesNotExist:
            return Response({'status': 'error', 'message': 'Invalid code entered'}, status=status.HTTP_400_BAD_REQUEST)

        if otp_obj.otp_expiration.replace(tzinfo=timezone.utc) < datetime.now(timezone.utc):
            return Response({'status': 'error', 'message': "Your code has expired. Click 'Resend Code' and enter the new code you receive to login."}, status=status.HTTP_400_BAD_REQUEST)

        if str(otp_obj.otp_code).zfill(6).strip() != user_otp.strip():
            return Response({'error': 'error', 'message': 'Invalid code entered. Please re-enter the code you received'}, status=status.HTTP_400_BAD_REQUEST)

        if not otp_obj.otp_2fa_enabled:
            otp_obj.otp_2fa_enabled = True
            otp_obj.last_login_2fa = datetime.now(timezone.utc)
            otp_obj.last_prompted_provider = None
            otp_obj.save()

        response_data = {
            'status': 'success',
            'expiration': datetime.now()
        }

        return Response(response_data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class PromptProviderAccount(APIView):
    def post(self, request):

        try:
            user_id = request.data.get('user_id')
            user = get_object_or_404(get_user_model(), pk=user_id)
            otp_obj, _ = TwoFactorAuthentication.objects.update_or_create(
                user=user,
                defaults={
                    'last_prompted_provider': datetime.now(timezone.utc),
                }
            )
        except TwoFactorAuthentication.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class GenerateQR(APIView):
    def post(self, request):
        data = request.data
        user_id = data.get('user_id', None)

        user = get_object_or_404(get_user_model(), pk=user_id)
        if user is None:
            return Response({"status": "fail", "message": f"No user found"},
                            status=status.HTTP_404_NOT_FOUND)

        qr_base32 = pyotp.random_base32()
        qr_auth_url = pyotp.totp.TOTP(qr_base32).provisioning_uri(
            name=user.email.lower(), issuer_name="Duett App")

        otp_obj, _ = TwoFactorAuthentication.objects.update_or_create(
            user=user,
            defaults={
                'qr_auth_url': qr_auth_url,
                'qr_base32': qr_base32,
            }
        )

        return Response({'base32': qr_base32, "auth_url": qr_auth_url}, status=status.HTTP_201_CREATED)


@permission_classes([IsAuthenticated])
class VerifyQR(APIView):
    def post(self, request):
        try:
            data = request.data
            user_id = data.get('user_id')
            otp_token = data.get('token')
            user = get_object_or_404(get_user_model(), pk=user_id)
            otp_obj = TwoFactorAuthentication.objects.get(user=user)
            totp = pyotp.TOTP(otp_obj.qr_base32)
            if not totp.verify(otp_token):
                return Response({"status": "error", "message": "Invalid code entered. Please re-enter the correct code"},
                                status=status.HTTP_400_BAD_REQUEST)
            otp_obj.qr_2fa_enabled = True
            otp_obj.verified = True
            otp_obj.save()

        except TwoFactorAuthentication.DoesNotExist:
            return Response({ 'status': 'error', 'message': 'User do not exist' }, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class ValidateQR(APIView):
    def post(self, request):
        message = "Invalid code entered. Please re-enter the correct code"
        data = request.data
        user_id = data.get('user_id', None)
        otp_token = data.get('token', None)

        user = get_object_or_404(get_user_model(), pk=user_id)
        otp_obj = TwoFactorAuthentication.objects.get(user=user)

        if otp_obj is None:
            return Response({"status": "fail", "message": f"No user found"},
                            status=status.HTTP_404_NOT_FOUND)

        if not otp_obj.verified:
            return Response({"status": "fail", "message": "QR must be verified first"},
                            status=status.HTTP_400_BAD_REQUEST)

        totp = pyotp.TOTP(otp_obj.qr_base32)
        if not totp.verify(otp_token, valid_window=1):
            return Response({"status": "fail", "message": message}, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class DisableQR(APIView):
    def post(self, request):
        data = request.data
        user_id = data.get('user_id', None)

        try:
            user = get_object_or_404(get_user_model(), pk=user_id)
            otp_obj = TwoFactorAuthentication.objects.get(user=user)
            otp_obj.qr_2fa_enabled = False
            otp_obj.verified = False
            otp_obj.qr_base32 = None
            otp_obj.qr_auth_url = None
            otp_obj.save()

        except:
            return Response({"status": "fail", "message": f"No user found"},
                            status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK)
