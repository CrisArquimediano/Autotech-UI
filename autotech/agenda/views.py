from rest_framework.views import APIView
from rest_framework.response import Response
from administracion.models import Turno_taller
from administracion.serializers import * 
from gestion_agenda.visualizar_y_modificar_agenda import *


class TurnoTallerAPIView(APIView):
    def get(self, request, id_taller:str):
        products = dias_disponibles_desde_hoy_a_treinta_dias(id_taller)
        serializer = TurnoTallerSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request):
       id = request.GET.get("id")
       tipo = request.GET.get("tipo")
       estado = request.GET.get("estado")
       taller = request.GET.get("taller")
       patente = request.GET.get("patente")
       fecha_inicio = request.GET.get("fecha_inicio")
       hora_inicio = request.GET.get("hora_inicio")
       fecha_fin = request.GET.get("fecha_inicio")
       hora_fin = request.GET.get("hora_fin")
       cargar_turno(id, tipo, estado, taller, patente, fecha_inicio, hora_inicio, fecha_fin, hora_fin)


class TurnoTallerCambioEstadoPapelesAPIView(APIView):
    # cambair el estao de los papeles
    
    
    """
    def post(self, request): # el request es el json que manda cris
        serializer = Turno_taller(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
   """