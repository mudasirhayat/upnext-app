from django.contrib.auth import get_user_model
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.models import Group
from django.contrib.sites.models import Site
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.utils.translation import gettext as _
from django.conf import settings

from .models import (
    Account,
    UserProfile,
    AgencyProfile,
    ProviderProfile,
    AgencyManagedUser,
    UserPreferences, User, TwoFactorAuthentication,
)


class UserRegistrationSerializer(RegisterSerializer):
    """
    For allauth library
    """

    password2 = serializers.CharField(
        style={"input_type": "password"}, write_only=True
    )

    class Meta:
        model = get_user_model()
        fields = ["email", "password", "password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def save(self, request, *args, **kwargs):
        password = self.validated_data["password1"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError(
                {"password": "Passwords must match."}
            )

        user = get_user_model().objects.create_user(
            email=self.validated_data["email"],
            password=password,
            is_staff=self.validated_data.get("is_staff", False),
            is_active=self.validated_data.get("is_active", True),
        )

        user.save()
        return user


class TwoFactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuthentication
        fields = ("otp_2fa_enabled", "qr_2fa_enabled", "last_prompted_provider","disable_2fa")


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = (
            "first_name",
            "last_name",
            "phone",
            "address",
            "city",
            "state",
            "zip",
        )


class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = ("id", "request_table_columns")


class CustomUserDetailsSerializer(UserDetailsSerializer):
    """
    User model w/o password
    """

    userprofile = UserProfileSerializer()

    class Meta:
        extra_fields = ["userprofile", "group"]
        if hasattr(get_user_model(), "EMAIL_FIELD"):
            extra_fields.append(get_user_model().EMAIL_FIELD)

        model = get_user_model()
        fields = ("id", *extra_fields)
        read_only_fields = ("email",)


class UserSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer(source="userprofile")
    user_preferences = UserPreferencesSerializer(
        source="userpreferences", read_only=True)
    managed_user_count = serializers.ReadOnlyField()
    is_active = serializers.ReadOnlyField()
    group = serializers.CharField()
    twofactor = serializers.SerializerMethodField(method_name='get_two_factor')

    def get_two_factor(self, obj, name=""):
        twofactor_obj, is_created = TwoFactorAuthentication.objects.get_or_create(user=obj)
        return TwoFactorSerializer(twofactor_obj).data

    class Meta:
        model = get_user_model()
        fields = (
            "id",
            "is_active",
            "email",
            "created_at",
            "updated_at",
            "user_profile",
            "user_preferences",
            "account",
            "managed_user_count",
            "group",
            "twofactor",
        )

        read_only_fields = ("account",)

    def create(self, validated_data):
        request = self.context.get("request")
        if not request:
            raise Exception(
                "UserSerializer must the request data to create a new user."
            )

        user_profile_data = validated_data.pop("userprofile")
        role = validated_data.pop("group")

        group = Group.objects.get(name=role)

        user = get_user_model()(account=request.user.account, **validated_data)
        password = get_user_model().objects.make_random_password(length=24)
user.set_password(password)
user.save()

        user.groups.add(group)
        obj, created = UserProfile.objects.update_or_create(user=user, defaults=user_profile_data)
        user.userprofile=obj
        return user

    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop("userprofile", None)
        role = validated_data.pop("group", None)

        instance = super().update(instance, validated_data)

        if role:
            group = Group.objects.get(name=role)
            instance.groups.set([group])

        if user_profile_data:
            obj, created = UserProfile.objects.update_or_create(user=instance, defaults=user_profile_data)
            instance.userprofile=obj
        return instance


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            "name",
            "id",
        )


class AgencyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgencyProfile
        fields = ("account",)


class ProviderProfileSerializer(serializers.ModelSerializer):
    account = AccountSerializer(many=False)

    class Meta:
        model = ProviderProfile
        fields = ("account", "phone")


class AgencyManagedUserSerializer(serializers.ModelSerializer):
    managed_user = UserSerializer(many=False)

    class Meta:
        model = AgencyManagedUser
        fields = ("id", "supervisor", "managed_user")


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password_reset_form_class = PasswordResetForm
    def validate_email(self, value):
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(_('Error'))

        ###### FILTER YOUR USER MODEL ######
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError(_('Invalid e-mail address'))
        return value

    def save(self):
        request = self.context.get('request')
        if Site.objects.filter(domain="qa.app.duett.io"):
            env_label = "QA:"
        elif Site.objects.filter(domain="staging.app.duett.io"):
            env_label = "STG:"
        else:
            env_label = ""

        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),

            ###### USE YOUR HTML FILE ######
            'html_email_template_name': 'password_reset_email.html',
            'subject_template_name': 'subject_template_name.txt',
            'request': request,
        }
        extra_email_context = {
            'env_label': f"{env_label}",
        }
        self.reset_form.save(**opts,extra_email_context=extra_email_context)