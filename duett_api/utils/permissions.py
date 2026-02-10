from rest_framework import permissions

class ObjectPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            # Add your permission logic here
            return True
        except:
            return False
    def has_permission(self, request, view, obj):
        if request.user == obj.owner:
            return True
        else:
            raise PermissionDenied
        return obj.id == request.user
