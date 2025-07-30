from django.db import models

from duett_api.utils.models import TimestampMixin


class ServiceType(TimestampMixin):
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"


class FundingSource(TimestampMixin):
    name = models.CharField(max_length=100)
    service_type = models.ManyToManyField(ServiceType, blank=True)

    def __str__(self):
        return f"{self.name}"


class ZipCode(TimestampMixin):
    """
    This is for many to many relationships with Providers
    """

    zip = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.zip}"
