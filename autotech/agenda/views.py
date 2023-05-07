"""
from rest_framework.views import APIView
from rest_framework.response import Response
from administracion.models import Turno_taller
from administracion.serializers import * 
import requests
from .gestion_agenda.visualizar_y_modificar_agenda import *
#from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse#, HttpResponse
from rest_framework import status
from django.views.decorators.http import require_http_methods
import json

class TurnoTallerAPIView(APIView):
    
    @require_http_methods(["GET"])
    def dias_horarios_disponibles(request, taller_id: str):
        dias_horarios_data = dias_disponibles_desde_hoy_a_treinta_dias(taller_id)
        return JsonResponse(dias_horarios_data, safe=False)
    
    def post(self, request, *args, **kwargs):
       _id_turno = request.data.get("id_turno")
       _tipo = request.data.get("tipo")
       _estado = request.data.get("estado")
       _taller_id = request.data.get("taller_id")
       _tecnico_id = request.data.get("tecnico_id")
       _patente = request.data.get("patente")
       _fecha_inicio = request.data.get("fecha_inicio")
       _hora_inicio = request.data.get("hora_inicio")
       _fecha_fin = request.data.get("fecha_fin")
       _hora_fin = request.data.get("hora_fin")
       _papeles_en_regla = request.data.get("papeles_en_regla")

       url = 'https://autotech.onrender.com/turnos/'
       data = { "id_turno": _id_turno,
            "tipo": _tipo,
            "estado": _estado,
            "tecnico_id": _tecnico_id,
            "patente": _patente,
            "fecha_inicio": _fecha_inicio,
            "hora_inicio": _hora_inicio,
            "fecha_fin": _fecha_fin,
            "hora_fin": _hora_fin,
            "papeles_en_regla": _papeles_en_regla,
            "taller_id": _taller_id
        }
       response = requests.post(url, json=data)
       if response.status_code == 201:
            print('Turno creado exitosamente')
       else:
            print('Hubo un problema al crear el turno')

class TurnoTallerCambioEstadoPapelesAPIView(APIView):
    # cambair el estado de los papeles
   """