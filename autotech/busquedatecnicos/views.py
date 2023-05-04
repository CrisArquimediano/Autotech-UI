import requests
# import json
# from django.shortcuts import render
# from django.shortcuts import redirect
# from django.contrib import messages
# from django.http import HttpRequest
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods


#------------------------------------------------------MEL Y JOA----------------------------------------------------------------------- 

# Definimos una vista que solo permita peticiones HTTP de tipo GET
@require_http_methods(["GET"])
def TecnicosList(request):
    # Especificamos la URL a la cual queremos hacer la petición GET
    url = "https://api-rest-pp1.onrender.com/api/tecnicos/"
    
    # Realizamos la petición GET a la URL especificada y almacenamos los datos obtenidos en la variable 'data'
    data = requests.get(url)
    
    # Verificamos si la respuesta de la API fue exitosa (status_code == 200)
    if data.status_code != 200:

         # Si no fue exitosa, regresamos una respuesta HTTP con un mensaje de error
        return HttpResponse(f"Error: {data.status_code}")
    
    # Si la respuesta fue exitosa, convertimos los datos obtenidos en un objeto JSON y lo regresamos como una respuesta HTTP
    data = data.json()
    # Tecnicos_data es una lista de diccionarios, por lo que se establece safe=False para permitir que se serialice esta estructura de datos.
    tecnicos = [{'nombre_completo': tecnico['nombre_completo'], 'categoria': tecnico['categoria']} for tecnico in data]
    return JsonResponse({'tecnicos': tecnicos})


# Definimos una vista que solo permita peticiones HTTP de tipo GET
@require_http_methods(["GET"])
def TecnicosDetail(request, id_tecnico):
    # Especificamos la URL a la cual queremos hacer la petición GET, incluyendo el ID del técnico deseado
    url = f"https://api-rest-pp1.onrender.com/api/tecnicos/{id_tecnico}"

    # Realizamos la petición GET a la URL especificada y almacenamos los datos obtenidos en la variable 'data'
    data = requests.get(url)

    # Verificamos si la respuesta de la API fue exitosa (status_code == 200)
    if data.status_code != 200:
        # Verificamos si la respuesta de la API fue exitosa (status_code == 200)
        return HttpResponse(f"Error: {data.status_code}")
    
    # Si la respuesta fue exitosa, convertimos los datos obtenidos en un objeto JSON y lo regresamos como una respuesta HTTP
    tecnico_data = data.json()
    return JsonResponse(tecnico_data, safe=False)


#-----------------------------------------------------CAMI-----------------------------------------------------------------------         

#Definimos una vista que solo permita peticiones HTTP de tipo GET
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
    return JsonResponse({'tecnicos':tecnicos})


#----------------------------------------------------MAITTE----------------------------------------------------------------------                     
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