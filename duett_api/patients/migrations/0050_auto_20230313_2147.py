# Generated by Django 3.2.8 on 2023-03-13 21:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('patients', '0049_merge_20211216_2333'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalpatientrequest',
            name='assigned_to',
            field=models.ForeignKey(blank=True, db_constraint=False, default=None, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='patientrequest',
name='assigned_to',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to=settings.AUTH_USER_MODEL),
        migrations.AlterField(
            model_name='historicalservicerequested',
            name='match_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='servicerequested',
            name='match_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
