# Generated by Django 3.1.5 on 2021-03-02 15:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0014_auto_20210223_0455'),
        ('patients', '0027_requestnotes_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='requestnotes',
            name='account',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='users.account'),
            preserve_default=False,
        ),
    ]
