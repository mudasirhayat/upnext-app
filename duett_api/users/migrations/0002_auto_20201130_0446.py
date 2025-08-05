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

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_groups, revert_groups),
    ]
