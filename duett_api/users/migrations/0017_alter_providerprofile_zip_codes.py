# Generated by Django 3.2.8 on 2021-11-30 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0006_auto_20210216_1743'),
        ('users', '0016_auto_20210616_1014'),
    ]

    operations = [
        migrations.AlterField(
            model_name='providerprofile',
            name='zip_codes',
            field=models.ManyToManyField(blank=True, related_name='zip_code', to='services.ZipCode'),
        ),
    ]
