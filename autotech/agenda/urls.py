from rest_framework import routers
from .api import TurnoTallerViewSet
from .views import *
from django.urls import path

router = routers.DefaultRouter()
#router.register('api/turnostaller', TurnoTallerViewSet, 'turnostaller')

urlpatterns = [
    #router.urls
    #path('turnostaller/', dias_disponibles_desde_hoy_a_treinta_dias, name='horariosDisponibles'),
    #path('turnostaller/', views.cargar_turno, name='horariosDisponibles'),
]


