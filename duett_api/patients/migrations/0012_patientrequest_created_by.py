# Generated by Django 3.1.4 on 2021-01-21 02:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("patients", "0011_patient_age"),
    ]

    operations = [
        migrations.AddField(
            model_name="patientrequest",
            name="created_by",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.DO_NOTHING,
                to="users.user",
            ),
            preserve_default=False,
        ),
    ]
