# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-04 08:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topico', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historialmedic',
            name='numhistorial',
            field=models.TextField(blank=True, null=True),
        ),
    ]