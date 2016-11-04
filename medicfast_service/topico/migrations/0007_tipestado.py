# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-04 11:05
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('topico', '0006_derivacion'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tipestado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('estado', models.CharField(blank=True, max_length=60, null=True)),
                ('derivacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='topico.Derivacion')),
            ],
            options={
                'verbose_name': 'Tipestado',
                'verbose_name_plural': 'Tipestados',
            },
        ),
    ]
