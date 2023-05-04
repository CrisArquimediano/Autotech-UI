import requests
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods

"""--------------------JSON MOCKEADO--------------------------"""
args_json = {
            "nombre_completo": "Camila Anahí Sánchez Rodriguez",
            "dni": "41024628",
            }
"""-----------------------------------------------------------"""
""" 
En caso de haber campos vacio, se ignora la busqueda hasta que complete todo. 
Si todos los campos están vacíos, regresa al formulario de busqueda con un error
"""
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


