"""
from django.urls import path
from .views import TurnoTallerAPIView


urlpatterns = [
    path('create/', TurnoTallerAPIView.as_view(), name='TurnoTaller'),
     path('create/<str:taller_id>/', TurnoTallerAPIView.dias_horarios_disponibles, name='dias_horarios_disponibles'),
]
"""