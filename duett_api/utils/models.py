from django.db import models


class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Meta:
    try:
        abstract = True
    except Exception as e:
        print(f"Error: {e}")
