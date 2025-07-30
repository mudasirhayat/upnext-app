from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import GroupAdmin, UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from allauth.account.models import EmailAddress
from django.forms import model_to_dict
from django.http import HttpResponseRedirect

from duett_api.utils.admin import SimpleHistoryMixin, SimpleHistoryShowDeletedFilter
from django.utils.html import format_html
from django.urls import path, reverse
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect, render
from django.contrib.sites.models import Site
from duett_api.patients.utils import send_patient_request_daily_notifications
from django.core.mail.message import EmailMessage
from django.conf import settings
from django.contrib import messages
from duett_api.users.models import User, TwoFactorAuthentication
from duett_api.patients.models import PatientRequest,ServiceRequested


from .models import (
    UserProfile,
    Account,
    ProviderProfile,
    AgencyProfile,
    AgencyManagedUser,
    UserPreferences,
)

admin.site.unregister(Group)
admin.site.unregister(EmailAddress)
# admin.site.unregister(Site)


class UserSetInline(admin.TabularInline):
    model = get_user_model().groups.through
    raw_id_fields = ("user",)


@admin.register(Group)
class MyGroupAdmin(GroupAdmin):
    inlines = [UserSetInline]


class GroupSetInline(admin.TabularInline):
    model = Group.user_set.through
    extra = 0


@admin.register(get_user_model())
class UserAdmin(BaseUserAdmin, SimpleHistoryMixin):
    list_display = (
        "id",
        "email",
        "account",
        "hijack_button",
        "is_staff",
        "is_superuser",
        "is_active",
        "is_verified",
    )
    list_filter = ("is_staff", "is_superuser", "is_active",
                   "is_verified", SimpleHistoryShowDeletedFilter)

    # This is used when updating a user:
    fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password", "account"),
            },
        ),
        (
            "Permissions",
            {
                "classes": ("wide",),
                "fields": ("is_superuser", "is_staff", "is_active"),
            },
        ),
    )

    # This is used when creating a user
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "account"),
            },
        ),
        (
            "Permissions",
            {
                "classes": ("wide",),
                "fields": ("is_superuser", "is_staff", "is_active"),
            },
        ),
    )

    search_fields = ("email",)
    ordering = ("email",)
    inlines = [GroupSetInline]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<int:pk>/hijack_user/",
                self.admin_site.admin_view(self.hijack_user),
                name='hijack_user',
            )
        ]
        return custom_urls + urls

    def hijack_user(self, request, pk):
        user = get_user_model().objects.get(id=pk)
        refresh = RefreshToken.for_user(user)
        refresh.payload.update({"kind":"hijack"})
        current_site = Site.objects.get_current()
        token = str(refresh.access_token)
        url = f"https://{current_site.domain}/?token={token}&refresh_token={str(refresh)}"
        return redirect(url)

    def hijack_button(self, obj):
        return format_html(
            '<a class="button" href="{}">Impersonate</a>',
            reverse('admin:hijack_user', args=[obj.id]),
        )

    hijack_button.short_description = 'Impersonate'
    hijack_button.allow_tags = True
    def get_changeform_initial_data(self, request):
        return {"is_active": True}

    def get_form(self, request, obj=None, **kwargs):
        """
        Prevent non-superusers from editing their own permissions
        """
        form = super().get_form(request, obj, **kwargs)
        is_superuser = request.user.is_superuser
        disabled_fields = set()

        if not is_superuser:
            disabled_fields |= {
                "username",
                "is_superuser",
            }

        if not is_superuser and obj is not None and obj == request.user:
            disabled_fields |= {
                "is_staff",
                "is_superuser",
                "groups",
            }

        for f in disabled_fields:
            if f in form.base_fields:
                form.base_fields[f].disabled = True

        return form

    def save_model(self, request, obj, form, change):
        # This will run only if it's a newly created user:
        if not change:
            if obj.is_superuser or obj.is_staff:
                obj.is_verified = True

        super().save_model(request, obj, form, change)


@admin.register(UserProfile)
class UserProfileAdmin(SimpleHistoryMixin):
    list_display = ("first_name", "last_name", "user")
    list_filter = (SimpleHistoryShowDeletedFilter,)



@admin.register(Account)
class AccountAdmin(SimpleHistoryMixin):
    actions = ['test_mail_care_agency']
    list_display = ("id", "name", "type")
    list_filter = ("type", SimpleHistoryShowDeletedFilter,)
    search_fields = ("name",)

    @admin.action(description='send email to selected agencies')
    def test_mail_care_agency(self, request, queryset):
        for query in queryset.iterator():
            flag_open_request=False
            flag=False
            if query.type == 2:
                users = User.objects.filter(account=query)
                for user in users:
                    send_patient_request_daily_notifications(user)

                    patient_requests = PatientRequest.objects.filter(created_by=user,status=1) | PatientRequest.objects.filter(created_by=user,status=4)
                    if patient_requests:
                        flag_open_request=True
                        flag=True
                if flag_open_request==False:
                    messages.error(request, 'Selected "%s" have no Open or Partially Matched requests'%(query))
                if flag==True:
                    messages.success(request, 'Email sent to "%s"'%(query))
            else:
                messages.error(request, '"%s" is Invalid type'%(query))




class AdminProfileMixin(admin.ModelAdmin):
    def get_account_type(self, obj):
        return obj.account.type

    get_account_type.admin_order_field = "account"
    get_account_type.short_description = "Account Type"


@admin.register(ProviderProfile)
class ProviderProfileAdmin(AdminProfileMixin, SimpleHistoryMixin):
    list_display = ("account", "phone", "get_account_type")
    search_fields = ("account__name", "phone")


@admin.register(AgencyProfile)
class AgencyProfileAdmin(AdminProfileMixin, SimpleHistoryMixin):
    list_display = ("account", "get_account_type")
    list_filter = (SimpleHistoryShowDeletedFilter,)


@admin.register(AgencyManagedUser)
class AgencyManagedUserAdmin(admin.ModelAdmin):
    list_display = ("supervisor", "managed_user", "created_at", "updated_at")
    search_fields = ("supervisor", "managed_user")


@admin.register(UserPreferences)
class UserPreferencesAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "request_table_columns")


@admin.register(TwoFactorAuthentication)
class TwoFactorAuthenticationAdmin(admin.ModelAdmin):
    actions = ["disable_2fa"]
    edit_exclude = (
        "otp_code",
        "otp_expiration",
        "qr_base32",
        "qr_auth_url",
        "verified",
        "last_configured_2fa",
        "last_login_2fa",
        "last_prompted_provider",
    )
    list_display = (
        "id",
        "user",
        "otp_2fa_enabled",
        "qr_2fa_enabled",
        "phone_number",
        'remove_button'
    )

    def disable_2fa(self, request, queryset):
        for user in queryset:
            try:
                user.disable_2fa = True
                user.qr_2fa_enabled = False
                user.otp_2fa_enabled = False
                user.save()
            except:
                pass

    def change_view(self, *args, **kwargs):
        self.exclude = getattr(self, 'edit_exclude', ())
        return super(TwoFactorAuthenticationAdmin, self).change_view(*args, **kwargs)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "<int:pk>/remove_2fa/",
                self.admin_site.admin_view(self.remove_2fa),
                name='remove_2fa',
            )
        ]
        return custom_urls + urls

    def remove_2fa(self, request, pk):
        current_site = Site.objects.get_current()
        url = f"https://{current_site.domain}/admin/users/twofactorauthentication/"
        url = url.replace("app", "api", 3)
        try:
            TwoFactorAuthentication.objects.filter(id=pk).update(
                qr_2fa_enabled=False,
                otp_2fa_enabled=False,
                verified=False,
                last_prompted_provider=None,
                phone_number=None
            )
            return redirect(url)

        except:
            return redirect(url)

    def remove_button(self, obj):
        return format_html(
            '<a class="button" href="{}">Remove</a>',
            reverse('admin:remove_2fa', args=[obj.id]),
        )

    remove_button.short_description = 'Remove 2FA'
    remove_button.allow_tags = True