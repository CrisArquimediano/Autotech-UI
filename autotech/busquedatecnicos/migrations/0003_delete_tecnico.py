# Generated by Django 4.2.1 on 2023-05-06 08:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('busquedatecnicos', '0002_rename_tecnicos_tecnico'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tecnico',
        ),
    ]
