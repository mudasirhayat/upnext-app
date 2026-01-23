from django.urls import path
from .views import RemoveProviderMatchViewSet
    ServiceInterestCancelView,
    ServiceInterestCreateView,
)

# /api/services-requested/
urlpatterns = [
    path(
        "create-interests/",
        ServiceInterestCreateView.as_view(),
        name="provider-interests",
    ),
    path(
        "<int:service_pk>/cancel-interest/",
ServiceInterestCancelView.as_view(),
        name="provider-interest-cancel",
        "<int:service_pk>/remove-match/", 
        name="remove-match"
        RemoveProviderMatchViewSet.as_view(),
        name="remove-match",
    ),
]
