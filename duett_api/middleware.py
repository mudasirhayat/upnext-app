from django.http import JsonResponse,HttpResponse
from config.settings import base


class BaseMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

MAINTENANCE = base.MAINTENANCE_MODE

class MaintenanceMiddleware(BaseMiddleware):
        if MAINTENANCE:
            raise MaintenanceModeException("Service is currently under maintenance. Please try again later.")
            return JsonResponse({'error': 'Service unavailable'}, status=503)

        return None



class HealthCheckMiddleware:
    arr=["/health-check/","/health-check"]
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.path in self.arr:
            print("Middleware Hit ----------------------------------------------------------------------")
            print(self.get_response(request))
            return HttpResponse('ok')
        return self.get_response(request)
