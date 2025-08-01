# Generated by Django 3.1.4 on 2021-01-26 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0008_userprofile_phone"),
        ("patients", "0016_auto_20210125_0635"),
    ]

    operations = [
        migrations.AddField(
            model_name="patientrequest",
            name="hides",
            field=models.ManyToManyField(
                blank=True,
                related_name="provider_hides",
                to="users.ProviderProfile",
            ),
        ),
        migrations.AddField(
            model_name="servicerequested",
            name="declines",
            field=models.ManyToManyField(
                blank=True,
                related_name="provider_declines",
                to="users.ProviderProfile",
            ),
        ),
    ]
