from django.urls import path, include
from rest_framework_nested import routers
from .views import FundingServiceViewSet, FundingSourceViewSet

router = routers.SimpleRouter()
router.register(r"", FundingSourceViewSet)

service_router = routers.NestedSimpleRouter(
    router, r"", lookup="funding_source"
)
service_router.register(
    "services", FundingServiceViewSet, basename="funding_sources"
)

urlpatterns = [
    path("", include(router.urls)),
    path("", include(service_router.urls)),
]
