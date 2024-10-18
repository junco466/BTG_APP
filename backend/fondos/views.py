from rest_framework import viewsets, status, serializers
from .models import Cliente, Fondo, Transaccion, ProductosCliente
from .serializers import ClienteSerializer, FondoSerializer, TransaccionSerializer, ProductosClienteSerializer
from django.core.mail import send_mail
from rest_framework.response import Response
from django.http import JsonResponse
import uuid

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FondoViewSet(viewsets.ModelViewSet):
    queryset = Fondo.objects.all()
    serializer_class = FondoSerializer

class ProductosClienteViewSet(viewsets.ModelViewSet):
    queryset = ProductosCliente.objects.all()
    serializer_class = ProductosClienteSerializer

    def get_queryset(self):
        queryset = super().get_queryset()  # Esto obtiene el queryset definido
        cliente_id = self.request.query_params.get('cliente_id', None)

        if cliente_id is not None:
            # Filtra las transacciones solo para los fondos a los que el cliente está suscrito
            fondos_ids = ProductosCliente.objects.filter(cliente__id=cliente_id).values_list('fondo_id', flat=True)
            queryset = queryset.filter(fondo_id__in=fondos_ids)

        return queryset

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

    def list(self, request, *args, **kwargs):
        cliente_id = request.query_params.get('cliente')  # Obtener el parámetro 'cliente' de la URL
        if cliente_id:
            queryset = self.queryset.filter(cliente_id=cliente_id)  # Filtrar por cliente
        else:
            queryset = self.queryset
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        # Cargar los datos en el serializer
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Aquí delegamos la lógica de creación a perform_create
        self.perform_create(serializer)

        # Extraemos los valores para el mensaje de respuesta
        tipo = serializer.validated_data['tipo']
        fondo = serializer.validated_data['fondo']

        # Retornar una respuesta de éxito con un mensaje personalizado
        return Response(
            {'message': f'Transacción {tipo} en el fondo {fondo.nombre} realizada con éxito.'},
            status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer):
        # Obtener los datos validados
        cliente = serializer.validated_data['cliente']
        fondo = serializer.validated_data['fondo']
        tipo = serializer.validated_data['tipo']
        monto_minimo = fondo.monto_minimo

        # Lógica de negocio según el tipo de transacción
        if tipo == 'Apertura':

            if ProductosCliente.objects.filter(cliente=cliente, fondo=fondo).exists():
                raise serializers.ValidationError({
                    'error': f'El cliente ya está suscrito al fondo {fondo.nombre}.'
                })
            
            if cliente.saldo < monto_minimo:
                raise serializers.ValidationError({
                    'error': f'No tiene saldo disponible para vincularse al fondo {fondo.nombre}'
                })

            cliente.saldo -= monto_minimo  # Descontar el monto mínimo si es una apertura    
            cliente.save() # Guardar los cambios en el cliente

            # Crear la suscripción del cliente al fondo
            ProductosCliente.objects.create(cliente=cliente, fondo=fondo)

        elif tipo == 'Cancelacion':

            if not ProductosCliente.objects.filter(cliente=cliente, fondo=fondo).exists():
                raise serializers.ValidationError({
                    'error': f'El cliente no está suscrito al fondo {fondo.nombre}, por lo tanto no lo puede cancelar.'
                })
            
            cliente.saldo += monto_minimo  # Aumentar el saldo si es una cancelación
            cliente.save() # Guardar los cambios en el cliente

            # Eliminar la relación de suscripción si existe
            ProductosCliente.objects.filter(cliente=cliente, fondo=fondo).delete()

        # Generar un identificador único y guardar la transacción
        identificador_unico = str(uuid.uuid4())
        serializer.save(identificador=identificador_unico)












































        # Enviar notificación por correo electrónico
        # self.enviar_correo(cliente, fondo, tipo)

    # def enviar_correo(self, cliente, fondo, tipo):
    #     """Enviar un correo de notificación al cliente."""
    #     asunto = f'Transacción {tipo} - Fondo {fondo.nombre}'
    #     mensaje = f'Su transacción de {tipo} en el fondo {fondo.nombre} ha sido realizada con éxito.'
    #     remitente = 'tu-correo@gmail.com'  # Aquí pones tu correo de prueba de Gmail
    #     destinatario = [cliente.email]  # Correo del cliente

    #     # Usamos la función send_mail de Django
    #     send_mail(
    #         asunto,
    #         mensaje,
    #         remitente,
    #         destinatario,
    #         fail_silently=False,
    #     )
