import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from administracion.models import Turno_taller
from administracion.serializers import TurnoTallerSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from agenda.gestion_agenda.visualizar_y_modificar_agenda import *


@api_view(['GET'])
def turnosOverview(request):
    turnos_urls={
        'List':'turnos-list/',
        'Detalle':'turnos-detalle/<str:id_turno>/',
        'Create':'turnos-create/',
        'Update':'turnos-update/<str:id_turno>/',
    }
    return Response(turnos_urls)

@api_view(['GET'])
def turnosList(request):
    turnos= Turno_taller.objects.all()
    serializer= TurnoTallerSerializer(turnos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def turnoDetalle(request,id):
    turno=Turno_taller.objects.get(id_turno=id)
    serializer= TurnoTallerSerializer(turno,many=False)
    return Response(serializer.data)

@api_view(['GET'])
def diasHorariosDisponibles(request, taller_id: str):
    dias_horarios_data = dias_disponibles_desde_hoy_a_treinta_dias(taller_id)
    
    resultado = [{'dia': dia, 'horarios y capacidad':dias_horarios_data.get(dia)} for dia in dias_horarios_data]
    
    return JsonResponse({'dias y capacidades':resultado})

@api_view(['POST'])
def crearTurno(request):
    serializer=TurnoTallerSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

@api_view(['POST'])
def turnoUpdate(request,id):
    turno= Turno_taller.objects.get(id_turno=id)
    serializer=TurnoTallerSerializer(instance=turno,data=request.data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(serializer.data)

