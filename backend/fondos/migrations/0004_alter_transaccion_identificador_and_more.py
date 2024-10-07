# Generated by Django 4.1.13 on 2024-10-05 22:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fondos', '0003_alter_fondo_categoria'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaccion',
            name='identificador',
            field=models.CharField(blank=True, max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='transaccion',
            name='tipo',
            field=models.CharField(choices=[('Apertura', 'Apertura'), ('Cancelacion', 'Cancelacion')], max_length=20),
        ),
        migrations.CreateModel(
            name='ProductosCliente',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateTimeField(auto_now_add=True)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fondos.cliente')),
                ('fondo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='fondos.fondo')),
            ],
        ),
    ]