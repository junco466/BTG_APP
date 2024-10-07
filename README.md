# Aplicación de Gestión de Fondos - BTG Pactual

Esta aplicación permite a los clientes de BTG Pactual gestionar sus fondos de inversión de manera intuitiva. A través de esta plataforma, los clientes pueden suscribirse a nuevos fondos, cancelar su suscripción a fondos existentes, ver el historial de transacciones, y recibir notificaciones por email o SMS.

La aplicación está dividida en dos partes:
1. **Backend** desarrollado con Django (REST Framework).
2. **Frontend** desarrollado con React.

### Resumen

1. **Requisitos Previos**: Describe las versiones requeridas de Python, Django, Node.js, y npm.
2. **Clonación del Repositorio**: Instrucciones para clonar el repositorio y moverse a la carpeta adecuada.
3. **Instalación del Backend (Django)**: Instrucciones para configurar el backend, instalar dependencias, hacer migraciones y correr el servidor de desarrollo.
4. **Instalación del Frontend (React)**: Instrucciones para configurar el frontend, instalar dependencias y ejecutar el servidor de desarrollo.
5. **Configuración y resumen de los endpoints**: Verificacion de los endpoints
6. **Ejecutar la Aplicación Completa**: Instrucciones para correr tanto el servidor de backend como el de frontend simultáneamente.

## 1. Requisitos Previos

Asegúrate de tener instalados los siguientes componentes antes de comenzar:

- Python (versión 3.8 o superior)
- Django (versión 4.0 o superior)
- Node.js (versión 14 o superior)
- npm (o yarn como alternativa para gestionar las dependencias de Node.js)

## 2. Clonación del Repositorio

Primero, clona el repositorio desde GitHub a tu máquina local.

```bash
git clone https://github.com/junco466/BTG_APP.git
cd <NOMBRE_DEL_REPOSITORIO>
```

## 3. Instalación del Backend (Django)

Crea un entorno virtual en Python (recomendado):

```bash
Copiar código
python -m venv venv
```
Activa el entorno virtual:
En Windows:

```bash
Copiar código
venv\Scripts\activate
```

En macOS/Linux:

```bash
Copiar código
source venv/bin/activate
```

Instala las dependencias necesarias, incluyendo django, djangorestframework, y django-cors-headers:

```bash
pip install -r backend/requirements.txt
```

Si no tienes el archivo requirements.txt, instala manualmente las dependencias con:

```bash
Copiar código
pip install django djangorestframework django-cors-headers
```

Realiza las migraciones para crear las tablas en la base de datos:

```bash
Copiar código
python manage.py makemigrations
python manage.py migrate
```

Configura el archivo settings.py:

Asegúrate de que el archivo settings.py incluye lo siguiente para permitir peticiones CORS y tener configurado el Django REST framework:

```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'corsheaders',
    # ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    # ...
]

# Permitir todas las fuentes (ajustar para producción)
CORS_ALLOW_ALL_ORIGINS = True

# Configuración REST framework
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ]
}
```

Ejecuta el servidor de desarrollo de Django:

```bash
python manage.py runserver
```

El servidor de backend estará corriendo en http://localhost:8000.

## 4. Instalación del Frontend (React)

Navega a la carpeta del frontend:

```bash
cd frontend
```

Instala las dependencias necesarias:

```bash
Copiar código
npm install
```

Ejecuta el servidor de desarrollo de React:

```bash
npm run dev
```

El servidor de frontend estará corriendo en http://localhost:5173/

## 5. Configuración y resumen de los endpoints
En caso de querer hacer pruebas de la API con con apps externas como por ejemplo postman, Asegúrate de que las peticiones de la aplicación React apunten al servidor de Django. A continuacion podemos ver los endpoints configurados en la API: 

clientes": "http://127.0.0.1:8000/api/clientes/

fondos": "http://127.0.0.1:8000/api/fondos/

transacciones": "http://127.0.0.1:8000/api/transacciones/

## 6. Ejecutar la Aplicación Completa

Ejecuta el backend (Django):

```bash
python manage.py runserver
```

Ejecuta el frontend (React):

```bash
npm run dev
```

Ahora deberías poder acceder a la aplicación completa en http://localhost:5173 para el frontend y las APIs estarán disponibles en http://localhost:8000.

## Notas Adicionales
Asegúrate de tener el puerto 8000 disponible para el backend y el puerto 5173 para el frontend. Si alguno de estos puertos está ocupado, podrías necesitar cambiar los puertos configurados en los servidores.
En un entorno de producción, deberás configurar CORS de manera más restrictiva para permitir solo los dominios específicos necesarios.

En la raiz de la carpeta encontrara el archivo sql con la consulta del punto 2 de la prueba.

Queda como trabajo futuro el envio del correo electronico y el despliegue en AWS Cloudformation
