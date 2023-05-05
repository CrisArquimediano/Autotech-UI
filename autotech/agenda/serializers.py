from rest_framework import serializers
from .models import Turno_taller
 
class TurnoTallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno_taller
        fields = ['id_turno', 'tipo', 'estado', 'taller_id', 'tecnico_id', 'patente', 'fecha_inicio', 'hora_inicio', 'fecha_fin', 'hora_fin', 'papeles_en_regla']
        extra_kwargs = {'id': {'required': True}}
        read_only_fields = ('id', 'tipo', 'taller_id', 'patente')