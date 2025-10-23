from django.urls import path, include
from rest_framework_nested import routers

from .views import (
    ActivateUsersView,
    DeactivateUsersView,
    UserViewSet,
    UserProfileView,
    AgencyManagedUserViewSet,
    UserPreferencesView,
    AboutMeView,
)

router = routers.SimpleRouter()
router.register(r"", UserViewSet)

managed_user_router = routers.NestedSimpleRouter(router, "", lookup="user")
managed_user_router.register(
path("managed-users/", AgencyManagedUserViewSet.as_view(), name="users") ]
    path("deactivate/", DeactivateUsersView.as_view()),
path("activate/", ActivateUsersView.as_view()),
path("me/", AboutMeView.as_view()),
path("<int:pk>/profile/", UserProfileView.as_view(), name="user-profile"),
    path("<int:pk>/preferences/", UserPreferencesView.as_view()),
    path("", include(router.urls)),
    path("", include(managed_user_router.urls)),
]
