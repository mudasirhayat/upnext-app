# Generated by Django 3.1.5 on 2021-03-02 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0029_patientrequest_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patientrequest',
            name='notes',
            field=models.TextField(blank=True),
        ),
    ]
