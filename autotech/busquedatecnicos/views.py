import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.response import Response

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