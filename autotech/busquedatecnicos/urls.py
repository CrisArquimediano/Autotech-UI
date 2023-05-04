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
    path('filtro/', views.buscar_tecnicos, name='todos'),
    path('filtro/categoria/<str:categoria>/', views.buscar_tecnicos, name='filtroTecnicosCategoria'),
    path('filtro/dni/<str:dni>/', views.buscar_tecnicos, name='filtroTecnicosDNI'),
    path('filtro/nombre/<str:nombre>/', views.buscar_tecnicos, name='filtroTecnicosNombre'),
    path('filtro/categoria/<str:categoria>/dni/<str:dni>/', views.buscar_tecnicos, name='filtroTecnicosCategoriaDNI'),
    path('filtro/categoria/<str:categoria>/nombre/<str:nombre>/', views.buscar_tecnicos, name='filtroTecnicosCategoriaNombre'),
    path('filtro/dni/<str:dni>/nombre/<str:nombre>/', views.buscar_tecnicos, name='filtroTecnicosDNINombre'),
    path('filtro/categoria/<str:categoria>/dni/<str:dni>/nombre/<str:nombre>/', views.buscar_tecnicos, name='filtroTecnicosCategoriaDNINombre'),

    #Ruta para obtener los tecnicos por dni y nombre completo
    path('tecnicosDniNombre/', views.busquedaTecnicos),
]