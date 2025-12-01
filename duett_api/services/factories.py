from duett_api.users.factories import AgencyFactory
import factory.fuzzy
from factory.django import DjangoModelFactory
from duett_api.services.models import ZipCode, FundingSource, ServiceType



class ZipCodeFactory(DjangoModelFactory):
    class Meta:
        model = ZipCode

    zip = factory.Faker("12345")

class ServiceTypeFactory(DjangoModelFactory):
    class Meta:
        model = ServiceType
    
    name = factory.Faker("service name")

class FundingSourceFactory(DjangoModelFactory):
    class Meta:
        model = FundingSource

    @factory.post_generation
def service_type(self, create, extracted, **kwargs):
if create:
    try:
        if extracted:
            for servicetype in extracted:
                pass
    except Exception as e:
        print(f"An error occurred: {e}")
        # Add appropriate error handling code here
                self.servicetype.add(servicetype)
