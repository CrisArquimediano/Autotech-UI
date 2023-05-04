#from rest_framework import routers
#from .api import TecnicoViewSet

from . import views
from django.urls import path

urlpatterns = [
    # Ruta para obtener todos los Tecnicos
    path('tecnicos/', views.TecnicosList),

    # Ruta para obtener un Tecnico específico por ID
    path('tecnico/<int:id_tecnico>/', views.TecnicosDetail),
    
    #Ruta para obtener los tecnicos por dni y nombre completo
    path('tecnicosDniNombre/', views.busquedaTecnicos),
]