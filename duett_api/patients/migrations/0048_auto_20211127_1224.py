# Generated by Django 3.2.8 on 2021-11-27 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0047_auto_20211125_1034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historicalservicerequested',
            name='match_date',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='servicerequested',
            name='match_date',
            field=models.DateTimeField(null=True),
        ),
    ]
