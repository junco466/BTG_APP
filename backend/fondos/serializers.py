from rest_framework import serializers
from .models import Cliente, Fondo, Transaccion, ProductosCliente

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class FondoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fondo
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = '__all__'

class ProductosClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductosCliente
        fields = '__all__'
