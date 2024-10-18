from django.contrib import admin
from .models import Cliente, Fondo, Transaccion, ProductosCliente


admin.site.register(Cliente)
admin.site.register(Transaccion)
admin.site.register(Fondo)
admin.site.register(ProductosCliente)