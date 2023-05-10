import requests
from django.http import JsonResponse, HttpResponse
from administracion.models import Turno_taller
from administracion.serializers import TurnoTallerSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .gestion_agenda.visualizar_y_modificar_agenda import *
from datetime import *


@api_view(['GET'])
def turnosOverview(request):
    turnos_urls={
        'List':'turnos-list/',
        'Detalle':'turnos-detalle/<str:id_turno>/',
        'DiasHorariosDisponibles':'horarios-disponibles/<str:taller_id>',
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
    
    resultado = [{'dia': dia, 'horarios_y_capacidad':dias_horarios_data.get(dia)} for dia in dias_horarios_data]
    
    return JsonResponse({'dias_y_capacidades':resultado})

@api_view(['POST'])
def crearTurno(request):
    dia = request.data.get("fecha_inicio")
    horario_inicio = request.data.get("hora_inicio")
    horario_fin = request.data.get("hora_fin")
    taller_id = request.data.get("taller_id")

    horario_inicio_time = datetime.strptime(horario_inicio, '%H:%M:%S').time()
    horario_fin_time = datetime.strptime(horario_fin, '%H:%M:%S').time()
    dia_date = datetime.strptime(dia, '%Y-%m-%d').date()
    
    if not horarios_validos(horario_inicio_time, horario_fin_time):
        return HttpResponse("error: los horarios de comienzo y fin de un turno deben ser horas exactas", status=400)
    if not horarios_dentro_de_rango(dia_date, horario_inicio_time, horario_fin_time):
        return HttpResponse("error: los horarios superan el limite de la jornada laboral", status=400)
    if not dia_valido(dia_date):
        return HttpResponse("error: no se puede sacar un turno para una fecha que ya paso.", status=400)
    if not esta_disponible(dia_date, horario_inicio_time, horario_fin_time, taller_id):
        return HttpResponse("error: ese dia no esta disponible en ese horario", status=400)
    
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

def horarios_validos(hora_inicio:time, hora_fin:time):
    return hora_inicio.minute == 0 and hora_fin.minute == 0 and hora_inicio.second == 0 and hora_fin.second == 0 # and hora_inicio <= hora_fin
        
def horarios_dentro_de_rango(dia:date, horario_inicio:time, horario_fin:time):
    if dia.weekday() == 6: # domigo
        horario_inicio_valido = horario_inicio.hour >= 8 and horario_inicio.hour <= 11 # podemos dar turnos de 8 a 11
        horario_fin_valido = horario_fin.hour >= 9 and horario_fin.hour <= 12 # los turnos pueden terminar de 9 a 12
    else:
        horario_inicio_valido = horario_inicio.hour >= 8 and horario_inicio.hour <= 16 # podemos dar turnos de 8 a 16
        horario_fin_valido = horario_fin.hour >= 9 and horario_fin.hour <= 17 # los turnos pueden terminar de 9 a 17
    return horario_inicio_valido and horario_fin_valido
    
def dia_valido(dia: date):
    return dia >= date.today()