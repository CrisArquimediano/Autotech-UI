from django.contrib import admin
from .models import *

# Register your models here.
class tallerADMIN(admin.ModelAdmin):
    list_display = ('id_taller', 'nombre', 'id_direccion', 'mail', 'telefono', 'id_sucursal',
    'capacidad', 'cant_tecnicos')

class turno_tallerADMIN(admin.ModelAdmin):
    list_display = ('id_turno', 'tipo', 'estado', 'taller_id', 'tecnico_id', 'patente',
    'fecha_inicio', 'hora_inicio', 'fecha_fin', 'hora_fin','frecuencia_km', 'papeles_en_regla')

admin.site.register(Taller,tallerADMIN)
admin.site.register(Turno_taller,turno_tallerADMIN)