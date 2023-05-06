#from rest_framework import routers
#from .api import TecnicoViewSet

from . import views
from django.urls import path

urlpatterns = [
    # Ruta para obtener todos los Tecnicos
    path('tecnicos/', views.lista_tecnicos, name='listaTecnicos'),
    
    # Ruta para obtener un Tecnico específico por ID
    path('tecnico/<int:id_tecnico>/', views.detalle_tecnico, name='detalleTecnico'),

    # Ruta para obtener las categorías
    path('categorias/', views.categorias, name='categorias'), 

    # Definimos las posibles combinaciones de busquedas a realizar.
    path('filtro/', views.buscar_tecnicos, name='filtros'),

    path('get_turnos/', views.getTurnos, name="get_turnos"),
    #Ruta para obtener los tecnicos por dni y nombre completo
    # path('tecnicosDniNombre/', views.busquedaTecnicos),
    path('post_turno/', views.postTurno, name="post_turno")
]