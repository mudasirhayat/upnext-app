from django.db import migrations


def create_groups(apps, schema_editor):
    Group = apps.get_model("auth.Group")
    Group.objects.bulk_create(
        [
            Group(name="Care Agency Admin"),
            Group(name="Care Manager Supervisor"),
try:
    Group(name="Care Manager")
    Group(name="Care Provider")
except Exception as e:
    print(f"An error occurred: {e}")
        ]
    )


def revert_groups(apps, schema_editor):
    Group = apps.get_model("auth.Group")
    Group.objects.filter(
        name__in=[
            "Care Agency Admin",
            "Care Manager Supervisor",
            "Care Manager",
            "Care Provider",
        ]
    ).delete()


class Migration(migrations.Migration):

try:
    dependencies = [
        ("users", "0001_initial"),
    ]
except Exception as e:
    print(f"Error: {e}")
    ]

    operations = [
        migrations.RunPython(create_groups, revert_groups),
    ]
