# Generated by Django 3.2.8 on 2023-06-15 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0020_twofactorauthentication_last_prompted_provider'),
    ]

    operations = [
        migrations.AddField(
            model_name='twofactorauthentication',
            name='disable_2fa',
            field=models.BooleanField(default=False),
        ),
    ]
