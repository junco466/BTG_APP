#from djongo import models
from django.db import models

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()
    telefono = models.CharField(max_length=20)
    saldo = models.DecimalField(max_digits=10, decimal_places=2, default=500000)

    def __str__(self):
        return self.nombre

class Fondo(models.Model):

    TIPO_DE_FONDO = [
    ('FPV', 'Fondo Voluntario de Pension'),
    ('FIC', 'Fondos de Inversion Colectiva'),
    ]

    nombre = models.CharField(max_length=100)
    monto_minimo = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.CharField(max_length=3, choices=TIPO_DE_FONDO)
    

    def __str__(self):
        return self.nombre

class Transaccion(models.Model):
    TIPO_TRANSACCION = [
        ('Apertura', 'Apertura'),
        ('Cancelacion', 'Cancelacion'),
    ]
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fondo = models.ForeignKey(Fondo, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=20, choices=TIPO_TRANSACCION)
    fecha = models.DateTimeField(auto_now_add=True)
    identificador = models.CharField(max_length=100, unique=True, blank=True)

class ProductosCliente(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fondo = models.ForeignKey(Fondo, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
