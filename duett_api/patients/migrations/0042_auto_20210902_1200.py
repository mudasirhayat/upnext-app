# Generated by Django 3.1.5 on 2021-09-02 06:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0041_auto_20210831_2107'),
    ]

    operations = [
        migrations.AlterField(
            model_name='archiveddeletepatientrequest',
            name='reason',
            field=models.IntegerField(choices=[(1, 'Client deceased.'), (2, 'Client circumstances changed.'), (3, 'Client has moved to new agency.'), (4, 'Request fulfilled outside of Duett.'), (5, 'Other (tell us why).'), (6, 'Client information entered incorrectly'), (7, 'Care plan/request entered incorrectly')], default=1),
        ),
    ]
