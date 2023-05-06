from django.urls import path
from .views import TurnoTallerAPIView


urlpatterns = [
    path('create/', TurnoTallerAPIView.as_view(), name='TurnoTaller'),
]
