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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers

router = DefaultRouter()
service_router = routers
]
