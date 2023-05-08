from . import views
from django.urls import path

urlpatterns = [
    # Ruta para obtener todos los Tecnicos
    path('tecnicos/', views.lista_tecnicos, name='listaTecnicos'),
    
    # Ruta para obtener un Tecnico específico por ID
    path('tecnico/<int:id_tecnico>/', views.detalle_trabajos_tecnico, name='detalleTecnico'),

    # Ruta para obtener las categorías
    path('categorias/', views.categorias, name='categorias'), 

    # Definimos las posibles combinaciones de busquedas a realizar.
    path('filtro/', views.buscar_tecnicos, name='filtros')

]
