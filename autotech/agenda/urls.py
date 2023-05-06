from django.urls import path
from .views import TurnoTallerAPIView


urlpatterns = [
    path('create/', TurnoTallerAPIView.as_view(), name='TurnoTaller'),
     path('create/<str:taller_id>/', TurnoTallerAPIView.horarios_disponibles, name='horarios_disponibles'),
]
