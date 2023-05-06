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

    def post(self, request): # el request es el json que manda cris
        serializer = Turno_taller(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
    