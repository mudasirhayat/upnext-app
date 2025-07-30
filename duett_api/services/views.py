from rest_framework import viewsets, mixins
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import (
    FundingSource,
)
from .serializers import (
    ServiceTypeSerializer,
    FundingSourceSerializer,
)


@permission_classes([IsAuthenticated])
class FundingSourceViewSet(
    mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = FundingSource.objects.all()
    serializer_class = FundingSourceSerializer


@permission_classes([IsAuthenticated])
class FundingServiceViewSet(viewsets.ViewSet):
    def list(self, request, funding_source_pk):
        fs = FundingSource.objects.get(pk=funding_source_pk)
        queryset = fs.service_type.all()
        serializer = ServiceTypeSerializer(queryset, many=True)
        return Response(serializer.data)
