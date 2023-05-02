from rest_framework import serializers
from .models import Project

class TecnicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id','dni','nombre', 'apellido', 'calificacion', 'contrasena', 'id_taller')
        