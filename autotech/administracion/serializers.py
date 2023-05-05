from rest_framework import serializers
from .models import Taller,Turno_taller


class TallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Taller
        fields = '__all__'


class TurnoTallerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno_taller
        fields = '__all__'