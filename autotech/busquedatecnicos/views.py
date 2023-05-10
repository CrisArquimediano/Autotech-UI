
import requests
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from administracion.models import Turno_taller

# ---------------------
# Funciones principales
# ---------------------


@api_view(["GET"])
def lista_tecnicos(request):
    """Devuelve un listado de todos los técnicos, con su ID, nombre completo y categoría.
    """
    sucursal_supervisor = request.GET.get('branch')
    if sucursal_supervisor[0] != 'S':
        return HttpResponse("error: el numero de sucursal no es valido", status=400)
    
    tecnicos = tecnicos_todos(sucursal_supervisor)
    return JsonResponse({'tecnicos': tecnicos})


@api_view(["GET"])
def detalle_trabajos_tecnico(request, id_tecnico):
    """Devuelve los detalles de los trabajos realizados por un tecnico particular.
    """
    sucursal_supervisor = request.GET.get('branch')
    if sucursal_supervisor[0] != 'S':
        return HttpResponse("error: el numero de sucursal no es valido", status=400)

    id_taller_sucursal = "T" + sucursal_supervisor[-3:]
    turnos = Turno_taller.objects.filter(tecnico_id=id_tecnico, taller_id=id_taller_sucursal).order_by('estado')

    data = []
    for turno in turnos:
        data.append({
            "id_turno": turno.id_turno,
            "patente": turno.patente,
            "fecha_inicio": turno.fecha_inicio,
            "hora_inicio": turno.hora_inicio,
            "fecha_fin": turno.fecha_fin,
            "hora_fin": turno.hora_fin,
            "tipo": turno.tipo,
            "estado": turno.estado
        })
    return Response(data)


@api_view(['GET'])
def categorias(request):
    """Devuelve una lista de todas las categorías de técnico disponibles.
    """
    tipos_categorias = ["A", "B", "C", "D"]
    return JsonResponse(tipos_categorias, safe=False)


@api_view(['GET'])
def buscar_tecnicos(request):
    """Busca y devuelve una lista de técnicos según los filtros especificados.

    Returns:
        JsonResponse: Un objeto JSON que contiene una lista de técnicos que cumplen los filtros especificados.
        HttpResponse: Si se encuentra un error HTTP al realizar la búsqueda.
    """
    sucursal_supervisor = request.GET.get('branch')
    categoria = request.GET.get('categoria')
    dni = request.GET.get('dni')
    nombre = request.GET.get('nombre_completo')

    if sucursal_supervisor[0] != 'S':
        return HttpResponse("error: el numero de sucursal no es valido", status=400)

    if not categoria_es_valida(categoria=categoria):
        return HttpResponse("error: Categoría no válida", status=400)

    if not dni_es_valido(dni=dni):
        return HttpResponse("error: DNI no válida", status=400)
    try:
        tecnicos = obtener_tecnicos(sucursal_supervisor, categoria, dni, nombre)     
        return JsonResponse({'tecnicos': tecnicos})

    except requests.HTTPError as e:
        return HttpResponse(str(e), status=e.response.status_code)

# ---------------------
# Funciones Auxiliares
# ---------------------

def obtener_tecnicos(sucursal_supervisor, categoria=None, dni=None, nombre=None):
    """Retorna una lista de diccionarios que contienen información de los técnicos que cumplen con los criterios de búsqueda especificados.
    """
    if categoria is None and dni is None and nombre is None:
        tecnicos = tecnicos_todos(sucursal_supervisor)
    else:
        tecnicos = tecnicos_todos(sucursal_supervisor)
        if categoria is not None:
            tecnicos = [
                tecnico for tecnico in tecnicos if tecnico['categoria'] == categoria]
        if dni is not None:
            tecnicos = [
                tecnico for tecnico in tecnicos if tecnico['dni'] == dni]
        if nombre is not None:
            tecnicos = [tecnico for tecnico in tecnicos if nombre.lower() in tecnico['nombre_completo'].lower()]

        if not tecnicos:
            return []
    return tecnicos


def tecnicos_todos(sucursal_supervisor):
    """Realiza una solicitud GET a una API para obtener una lista de todos los técnicos y devuelve los datos como una lista de diccionarios.
    """
    url = "https://api-rest-pp1.onrender.com/api/usuarios/"
    usuarios_data = requests.get(url)

    if usuarios_data.status_code != 200:
        raise requests.HTTPError(f"Error: {usuarios_data.status_code}")

    usuarios_data = usuarios_data.json()
    tecnicos = [{
        'id_empleado': tecnico['id_empleado'],
        'nombre_completo': tecnico['nombre_completo'], 
        'dni': tecnico['dni'], 
        'categoria': tecnico['categoria'], 
        'branch': tecnico['branch']
        } for tecnico in usuarios_data if tecnico['branch'].endswith(sucursal_supervisor[-3:]) and tecnico['tipo'] == "Tecnico"]   
   
    return tecnicos


def categoria_es_valida(categoria=None):
    tipos_categorias = ["A", "B", "C", "D"]
    if categoria is not None and categoria not in tipos_categorias:
        return False
    return True


def dni_es_valido(dni=None):
    if dni is not None and (not dni.isdigit() or (len(dni) <= 0 or len(dni) > 10)):
        return False
    return True