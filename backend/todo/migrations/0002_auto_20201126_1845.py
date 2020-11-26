# Generated by Django 3.1.3 on 2020-11-26 18:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='end_time',
            field=models.DateTimeField(blank=True, null=True, verbose_name='Time when task was ended'),
        ),
        migrations.AddField(
            model_name='todo',
            name='start_time',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, verbose_name='Starting time for the task'),
        ),
    ]
