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

class ProductosClienteSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all())
    fondo_detalle = FondoSerializer(source='fondo', read_only=True)

    class Meta:
        model = ProductosCliente
        fields = '__all__'

class TransaccionSerializer(serializers.ModelSerializer):
    #fondo_nombre = serializers.CharField(source='fondo.nombre', read_only=True)
    #fondo = serializers.StringRelatedField()  # Esto asume que el `__str__` de fondo devuelve el nombre.
    #subscritos = ProductosClienteSerializer(read_only=True)
    fondo = serializers.PrimaryKeyRelatedField(
        queryset=Fondo.objects.all(), write_only=True
    )
    fondo_detalle = FondoSerializer(source='fondo', read_only=True)

    class Meta:
        model = Transaccion
        fields = '__all__'