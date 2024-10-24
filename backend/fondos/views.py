#from django.core.mail import send_mail (Python 3.12 tiene problemas con esta libreria, no envia correo)
#from django.http import JsonResponse

from rest_framework import viewsets, status, serializers
from .models import Cliente, Fondo, Transaccion, ProductosCliente
from .serializers import ClienteSerializer, FondoSerializer, TransaccionSerializer, ProductosClienteSerializer
from rest_framework.response import Response
import uuid
from django.conf import settings

#Librerias para enviar correo
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
            


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
            fondos_ids = ProductosCliente.objects.filter(
                cliente__id=cliente_id).values_list('fondo_id', flat=True)
            queryset = queryset.filter(fondo_id__in=fondos_ids)

        return queryset


class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    serializer_class = TransaccionSerializer

    def list(self, request, *args, **kwargs):
        # Obtener el parámetro 'cliente' de la URL
        cliente_id = request.query_params.get('cliente')
        if cliente_id:
            queryset = self.queryset.filter(
                cliente_id=cliente_id)  # Filtrar por cliente
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
            {'message': f'Transacción {tipo} en el fondo {
                fondo.nombre} realizada con éxito.'},
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
            cliente.save()  # Guardar los cambios en el cliente

            # Crear la suscripción del cliente al fondo
            ProductosCliente.objects.create(cliente=cliente, fondo=fondo)

            # Enviar correo electrónico para la apertura
            self.enviar_correo(
                cliente.email,
                'Apertura de Fondo',
                f'Se ha realizado una apertura de fondo en {fondo.nombre} por un monto mínimo de {monto_minimo}.'
            )

        elif tipo == 'Cancelacion':

            if not ProductosCliente.objects.filter(cliente=cliente, fondo=fondo).exists():
                raise serializers.ValidationError({
                    'error': f'El cliente no está suscrito al fondo {fondo.nombre}, por lo tanto no lo puede cancelar.'
                })

            cliente.saldo += monto_minimo  # Aumentar el saldo si es una cancelación
            cliente.save()  # Guardar los cambios en el cliente

            # Eliminar la relación de suscripción si existe
            ProductosCliente.objects.filter(
                cliente=cliente, fondo=fondo).delete()
            
            # Enviar correo electrónico para la cancelación
            self.enviar_correo(
                cliente.email,
                'Cancelación de Fondo',
                f'Se ha realizado la cancelación de su suscripción al fondo {fondo.nombre}.'
            )

        # Generar un identificador único y guardar la transacción
        identificador_unico = str(uuid.uuid4())
        serializer.save(identificador=identificador_unico)


    def enviar_correo(self, email_destinatario, asunto, mensaje):
        """Enviar un correo de notificación al cliente."""
        try:
            
            # Crear mensaje
            msg = MIMEMultipart()
            msg['From'] = settings.EMAIL_HOST_USER
            msg['To'] = email_destinatario
            msg['Subject'] = asunto
            
            # Agregar cuerpo del mensaje
            msg.attach(MIMEText(mensaje, 'plain'))
            
            # Crear conexión SMTP segura
            server = smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT)
            server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)
            
            # Enviar correo
            server.send_message(msg)
            server.quit()
            
            return True
        except Exception as e:
            print(f"Error al enviar el correo: {str(e)}")
            return False














#DJANGO 3.12 TIENE PROBLEMAS CON EL MODULO  django.core.mail POR LO QUE NO PERMITE ENVIAR CORREO CON ESTA SINTAXIS.
    # def enviar_correo(self, email_destinatario, asunto, mensaje):
    #     """Enviar un correo de notificación al cliente."""
    #     send_mail(
    #         subject='Prueba envio',
    #         message='Se prueba el envio del correo',
    #         from_email='jsbalbin466@gmail.com',  # Se utiliza el correo configurado en settings.py
    #         recipient_list=['junco466@gmail.com'],  # Lista de destinatarios, en este caso, el cliente
    #         fail_silently=False,  # Lanzará una excepción si el envío falla
    #     )

