from django.contrib import admin
from import_export import resources
from import_export.admin import ImportMixin

from .models import ServiceType, FundingSource, ZipCode


class FundingSourceInline(admin.TabularInline):
    model = FundingSource.service_type.through
    verbose_name = "Funding Source"
    verbose_name_plural = "Funding Sources"


@admin.register(ServiceType)
class ServiceTypeAdmin(admin.ModelAdmin):
    inlines = (FundingSourceInline,)
    list_display = ("name",)


@admin.register(FundingSource)
class FundingSourceAdmin(admin.ModelAdmin):
    pass


class ZipCodeResource(resources.ModelResource):
    class Meta:
        model = ZipCode
        fields = ['zip']
        import_id_fields = ['zip']


@admin.register(ZipCode)
class ZipCodeAdmin(ImportMixin, admin.ModelAdmin):
    resource_class = ZipCodeResource
