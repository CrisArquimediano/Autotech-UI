from rest_framework.views import APIView
from rest_framework.response import Response
from administracion.models import Turno_taller
from administracion.serializers import * 
import requests
from .gestion_agenda.visualizar_y_modificar_agenda import *
from django.views.decorators.csrf import csrf_exempt

class TurnoTallerAPIView(APIView):
    def get(self, request):
        taller = request.GET.get("taller_id")
        products = dias_disponibles_desde_hoy_a_treinta_dias(taller)
        serializer = TurnoTallerSerializer(products, many=True)
        return Response(serializer.data)
    
    @csrf_exempt
    def post(self, request):
       id_turno = request.get("id_turno")
       tipo = request.get("tipo")
       estado = request.get("estado")
       taller_id = request.get("taller_id")
       tecnico_id = request.get("tecnico_id")
       patente = request.get("patente")
       fecha_inicio = request.get("fecha_inicio")
       hora_inicio = request.get("hora_inicio")
       fecha_fin = request.get("fecha_fin")
       hora_fin = request.get("hora_fin")
       papeles_en_regla = request.get("papeles_en_regla")
       
       #turno = Turno_taller(id_turno=id_turno, tipo=tipo, estado=estado, taller_id=taller_id, tecnico_id=tecnico_id,patente=patente, fecha_inicio=fecha_inicio, hora_inicio=hora_inicio, fecha_fin=fecha_fin, hora_fin=hora_fin, papeles_en_regla=papeles_en_regla)
       #turno.save()
       url = 'https://autotech.onrender.com/turnos/'
       data = { "id_turno": id_turno,
            "tipo": tipo,
            "estado": estado,
            "tecnico_id": tecnico_id,
            "patente": patente,
            "fecha_inicio": fecha_inicio,
            "hora_inicio": hora_inicio,
            "fecha_fin": fecha_fin,
            "hora_fin": hora_fin,
            "papeles_en_regla": papeles_en_regla,
            "taller_id": taller_id
        }
       response = requests.post(url, json=data)
       
       if response.status_code == 201:
            # El POST fue exitoso, haz algo con la respuesta si lo necesitas
            print('Turno creado exitosamente')
       else:
        # El POST falló por alguna razón, maneja el error según corresponda
            print('Hubo un problema al crear el turno')

class TurnoTallerCambioEstadoPapelesAPIView(APIView):
    # cambair el estado de los papeles
    
    
    """
    def post(self, request): # el request es el json que manda cris
        serializer = Turno_taller(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
   """