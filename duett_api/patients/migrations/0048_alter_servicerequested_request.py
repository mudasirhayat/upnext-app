# Generated by Django 3.2.8 on 2021-12-02 14:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0047_auto_20211130_0612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicerequested',
            name='request',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='patients.patientrequest'),
        ),
    ]
