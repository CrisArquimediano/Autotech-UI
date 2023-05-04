#from rest_framework import routers
#from .api import TecnicoViewSet

from . import busquedaTecnicos
from django.urls import path

urlpatterns = [
    #Ruta para obtener los tecnicos por dni y nombre completo
    path('tecnicosDniNombre/', busquedaTecnicos.busquedaTecnicos),
]