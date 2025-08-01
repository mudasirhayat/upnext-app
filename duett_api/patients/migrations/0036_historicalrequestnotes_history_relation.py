# Generated by Django 3.1.5 on 2021-07-08 10:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0035_historicalrequestnotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicalrequestnotes',
            name='history_relation',
            field=models.ForeignKey(db_constraint=False, default=1, on_delete=django.db.models.deletion.DO_NOTHING, related_name='histories', to='patients.requestnotes'),
            preserve_default=False,
        ),
    ]
