# Generated by Django 3.1.5 on 2021-02-27 04:21

from django.db import migrations


def create_table_columns(apps, schema_editor):
    TableColumns = apps.get_model("patients.TableColumns")
    TableColumns.objects.bulk_create(
        [
            TableColumns(name="ID", sequence=1, table_name=1, column_type=1),
            TableColumns(
                name="Patient Name",
                sequence=2,
                role=2,
                table_name=1,
                column_type=1,
                sort_label="patient__last_name",
            ),
            TableColumns(
                name="Care Manager Name",
                sequence=2,
                role=1,
                table_name=1,
                column_type=1,
                sort_label="created_by__userprofile__last_name",
            ),
            TableColumns(
                name="Zip Code",
                sequence=3,
                table_name=1,
                column_type=1,
                sort_label="patient__zip",
            ),
            TableColumns(
                name="Funding Source", sequence=4, table_name=1, column_type=1
            ),
            TableColumns(
                name="Service(s)", sequence=5, table_name=1, column_type=1
            ),
            TableColumns(
                name="Hours", sequence=6, table_name=1, column_type=1
            ),
            TableColumns(
                name="Time Since Posted",
                sequence=7,
                table_name=1,
                column_type=1,
                sort_label="created_at",
            ),
            TableColumns(
                name="Status", sequence=8, table_name=1, column_type=1
            ),
        ]
    )


def revert_table_columns(apps, schema_editor):
    TableColumns = apps.get_model("patients.TableColumns")
    TableColumns.objects.filter(table_name=1).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("patients", "0025_auto_20210222_1350"),
    ]

    operations = [
        migrations.RunPython(create_table_columns, revert_table_columns),
    ]
