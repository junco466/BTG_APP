from django.urls import path, include
from rest_framework.routers import DefaultRouter
from fondos.views import ClienteViewSet, FondoViewSet, TransaccionViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'fondos', FondoViewSet)
router.register(r'transacciones', TransaccionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]