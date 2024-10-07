from django.contrib import admin
from .models import Cliente, Fondo, Transaccion


admin.site.register(Cliente)
admin.site.register(Transaccion)
admin.site.register(Fondo)