#from django.shortcuts import render

import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods

from .gestion_agenda.turno import *
from datetime import date, time

""" Codigo de la rama de Joaco:
@require_http_methods(["GET"])
def busquedaTecnicos(request):
    #Especificamos la URL a la cual queremos hacer la petición GET
    url = 'https://api-rest-pp1.onrender.com/api/tecnicos/'
    data= requests.get(url)
    
    if data.status_code!=200:
        return HttpResponse(f"Error: {data.status_code}")
    
    data= data.json()
    #Tecnicos_data es una lista de diccionarios, por lo que se establece safe=False para permitir que se serialice esta estructura de datos.

    tecnicos=[{'dni':tecnico['dni'],'nombre_completo':tecnico['nombre_completo']} for tecnico in data]
    return JsonResponse({'tecnicos':tecnicos})
    """

@require_http_methods(["GET"])
def dias_disponibles_desde_hoy_a_treinta_dias(id_taller: str):
    data = dias_disponibles_desde_hoy_a_treinta_dias(id_taller) # horarios es un diccionario
    return JsonResponse(data)

#def cargar_turno(id: int, tipo: str, estado: str, taller_id: str, patente: str, fecha_inicio: date, hora_inicio: time, fecha_fin: date, hora_fin: time):
#    cargar_turno(id, tipo, estado, taller_id, patente, fecha_inicio, hora_inicio, fecha_fin, hora_fin)
    