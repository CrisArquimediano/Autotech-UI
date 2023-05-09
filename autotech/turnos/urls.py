from django.urls import path

from . import views

urlpatterns = [
    path('',views.turnosOverview,name='turnos'),

    path('turnos-list/', views.turnosList, name='turnos-list'),

    path('turnos-detalle/<int:id>', views.turnoDetalle, name='turnos-detalle'),

    path('turnos-create/', views.crearTurno,name="turnos-create"),

    path('turnos-update/<int:id>', views.turnoUpdate,name="turnos-update"),
    
    path('horarios-disponibles/<str:taller_id>', views.diasHorariosDisponibles,name="horarios-disponibles")
]


