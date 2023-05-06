# import json
# from django.shortcuts import render
# from django.shortcuts import redirect
# from django.contrib import messages
# from django.http import HttpRequest
from typing import Any
from django import http
import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.http import HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
import json
from administracion.models import Turno_taller
from administracion.serializers import TurnoTallerSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views import View
from django.utils.decorators import method_decorator

@api_view(['GET'])
def getTurnos(request):
    turnos= Turno_taller.objects.all()
    serializer = TurnoTallerSerializer(turnos, many=True)
    return Response(serializer.data)
    
    
@api_view(['POST'])
def postTurno(request):
    data=request.data
    turno= Turno_taller.objects.create(
                id_turno=data['id_turno'],
                tipo=data['tipo'],
                estado=data['estado'],
                tecnico_id=data['tecnico_id'],
                patente=data['patente'],
                fecha_inicio=data['fecha_inicio'],
                hora_inicio=data['hora_inicio'],
                fecha_fin=data['fecha_fin'],
                hora_fin=data['hora_fin'],
                papeles_en_regla=data['papeles_en_regla'],
                taller_id=data['taller_id']
            )   
    serializer=TurnoTallerSerializer(turno, many=False)
    return Response(serializer.data)



""""
    @csrf_exempt
    def crear_turno(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            print(data)
            Turno_taller.objects.create(
                id_turno=data['id_turno'],
                tipo=data['tipo'],
                estado=data['estado'],
                tecnico_id=data['tecnico_id'],
                patente=data['patente'],
                fecha_inicio=data['fecha_inicio'],
                hora_inicio=data['hora_inicio'],
                fecha_fin=data['fecha_fin'],
                hora_fin=data['hora_fin'],
                papeles_en_regla=data['papeles_en_regla'],
                taller_id=data['taller_id']
            )
            datos = {'mensaje': 'Success'}
            return JsonResponse(datos)
        return JsonResponse({'mensaje': 'Este método solo permite peticiones POST.'})
"""
# ------------------------------------------------------MEL Y JOA-----------------------------------------------------------------------
# ---------------------
# Funciones principales
# ---------------------


@require_http_methods(["GET"])
def lista_tecnicos(request):
    """Devuelve un listado de todos los técnicos, con su ID, nombre completo y categoría.
    """
    tecnicos_data = tecnicos_todos()
    tecnicos = [{'id_empleado': tecnico['id_empleado'], 'nombre_completo': tecnico['nombre_completo'],
                 'categoria': tecnico['categoria']} for tecnico in tecnicos_data]
    return JsonResponse({'tecnicos': tecnicos})


@require_http_methods(["GET"])
def detalle_tecnico(request, id_tecnico):
    """Devuelve los detalles de un técnico en particular, especificado por su ID.
    """
    url = f"https://api-rest-pp1.onrender.com/api/tecnicos/{id_tecnico}"
    data = requests.get(url)

    if data.status_code != 200:
        return HttpResponse(f"Error: {data.status_code}")

    tecnico_data = data.json()
    return JsonResponse(tecnico_data, safe=False)


@require_http_methods(['GET'])
def categorias(request):
    """Devuelve una lista de todas las categorías de técnico disponibles.
    """
    tipos_categorias = ["A", "B", "C", "D"]
    return JsonResponse(tipos_categorias, safe=False)


@require_http_methods(['GET'])
def buscar_tecnicos(request):
    """Busca y devuelve una lista de técnicos según los filtros especificados.

    Returns:
        JsonResponse: Un objeto JSON que contiene una lista de técnicos que cumplen los filtros especificados.
        HttpResponse: Si se encuentra un error HTTP al realizar la búsqueda.
    """
    categoria = request.GET.get('categoria')
    dni = request.GET.get('dni')
    nombre = request.GET.get('nombre_completo')

    if not categoria_es_valida(categoria=categoria):
        return HttpResponse("error: Categoría no válida", status=400)

    if not dni_es_valido(dni=dni):
        return HttpResponse("error: DNI no válida", status=400)
    try:
        tecnicos = obtener_tecnicos(
            categoria=categoria, dni=dni, nombre=nombre)
        return JsonResponse({'tecnicos': tecnicos})

    except requests.HTTPError as e:
        return HttpResponse(str(e), status=e.response.status_code)


def obtener_tecnicos(categoria=None, dni=None, nombre=None):
    """Retorna una lista de diccionarios que contienen información de los técnicos que cumplen con los criterios de búsqueda especificados.
    """
    if categoria is None and dni is None and nombre is None:
        tecnicos = tecnicos_todos()
    else:
        tecnicos = tecnicos_todos()
        if categoria is not None:
            tecnicos = [
                tecnico for tecnico in tecnicos if tecnico['categoria'] == categoria]
        if dni is not None:
            tecnicos = [
                tecnico for tecnico in tecnicos if tecnico['dni'] == dni]
        if nombre is not None:
            tecnicos = [tecnico for tecnico in tecnicos if nombre.lower(
            ) in tecnico['nombre_completo'].lower()]

        if not tecnicos:
            return []
    return tecnicos


# ---------------------
# Funciones Auxiliares
# ---------------------

def tecnicos_todos():
    """Realiza una solicitud GET a una API para obtener una lista de todos los técnicos y devuelve los datos como una lista de diccionarios.
    """
    url = "https://api-rest-pp1.onrender.com/api/tecnicos/"
    data = requests.get(url)

    if data.status_code != 200:
        raise requests.HTTPError(f"Error: {data.status_code}")

    data = data.json()
    return data


def categoria_es_valida(categoria=None):
    tipos_categorias = ["A", "B", "C", "D"]
    if categoria is not None and categoria not in tipos_categorias:
        return False
    return True


def dni_es_valido(dni=None):
    if dni is not None and (not dni.isdigit() or (len(dni) <= 0 or len(dni) > 10)):
        return False
    return True


# -----------------------------------------------------CAMI-----------------------------------------------------------------------

""" #Definimos una vista que solo permita peticiones HTTP de tipo GET
@require_http_methods(["GET"])
def busquedaTecnicos(request):
    #Especificamos la URL a la cual queremos hacer la petición GET
    url = 'https://api-rest-pp1.onrender.com/api/tecnicos/'

    #Realizamos la petición GET a la URL especificada y almacenamos los datos obtenidos en la variable 'data'
    data= requests.get(url)

    #Verificamos si la respuesta de la API fue exitosa (status_code==200)
    if data.status_code!=200:
        #Si no fue exitosa, regresamos una respuesta HTTP con un mensaje de error
        return HttpResponse(f"Error: {data.status_code}")
    
    #Si la respuesta fue exitosa, convertimos los datos obtenidos en un objeto JSON y lo regresamos como una respuesta HTTP
    data= data.json()
    #Tecnicos_data es una lista de diccionarios, por lo que se establece safe=False para permitir que se serialice esta estructura de datos.

    tecnicos=[{'dni':tecnico['dni'],'nombre_completo':tecnico['nombre_completo']} for tecnico in data]
    return JsonResponse({'tecnicos':tecnicos}) """


# ----------------------------------------------------MAITTE----------------------------------------------------------------------
""" def busquedaTecnicos(request):
    """
#  errores = []

#  if request.method == 'GET':
#      dni = request.GET.get('dni')
#      nombre_completo = request.GET.get('nombre_completo')
#      if not (dni or nombre_completo):
#          errores.append('Ingresa un valor para la búsqueda.')
#          print("hola soy un error")
#          return errores
"""
    print("REQUEST: ", request)

    datos = requests.get(url)
    resultados = datos.json()

    if (datos.status_code == 200):

        resultados_formateados = []
        for resultado in resultados:

            #if (request.get("dni") == resultado["dni"] or request.get("nombre_completo") == resultado["nombre_completo"]): #no me reconoce el get :c
                
                resultado_formateado = {
                    "dni": resultado["dni"],
                    "nombre_completo": resultado["nombre_completo"],
                    "categoria": resultado["categoria"],
                    "brach": resultado["branch"]
                }
                resultados_formateados.append(resultado_formateado)

        # devuelve los resultados
        return resultados_formateados  """
