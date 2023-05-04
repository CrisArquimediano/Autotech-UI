import requests
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages

"""--------------------JSON MOCKEADO--------------------------"""
args_json = {
            "nombre_completo": "Camila Anahí Sánchez Rodriguez",
            "dni": "41024628",
            }
"""-----------------------------------------------------------"""

if __name__ == '__main__':
    url = 'https://api-rest-pp1.onrender.com/api/tecnicos/'
    datos = requests.get(url)

    if datos.status_code == 200:
        print(datos)

""" 
En caso de haber campos vacio, se ignora la busqueda hasta que complete todo. 
Si todos los campos están vacíos, regresa al formulario de busqueda con un error
"""
def busquedaTecnicos(request):
    errores = []
    
    if request == 'GET':
        dni = request.GET.get('dni')
        nombre_completo = request.GET.get('nombre_completo')

        if not (dni or nombre_completo):
            errores.append('Ingresa un valor para la búsqueda.')
            return errores

    datos = requests.get(url, params=request)
    if datos.status_code == 200:
        print(datos)


print(busquedaTecnicos(args_json))
