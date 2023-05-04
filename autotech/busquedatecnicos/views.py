import requests
import json
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib import messages
from django.http import HttpRequest

"""--------------------JSON MOCKEADO--------------------------"""
parametros = {
            "nombre_completo": "Tobias Joaquin Sanchez Rodriguez",
            "dni": "42948062"
            }
args_json = json.dumps(parametros)
"""-----------------------------------------------------------"""

if __name__ == '__main__':
    url = 'https://api-rest-pp1.onrender.com/api/tecnicos/'

""" 
En caso de haber campos vacio, se ignora la busqueda hasta que complete todo. 
Si todos los campos están vacíos, regresa al formulario de busqueda con un error
"""
def busquedaTecnicos(request):
    """
    errores = []
    
    if request.method == 'GET':
        dni = request.GET.get('dni')
        nombre_completo = request.GET.get('nombre_completo')
        if not (dni or nombre_completo):
            errores.append('Ingresa un valor para la búsqueda.')
            print("hola soy un error")
            return errores
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
        return resultados_formateados   


print("BUSQUEDA: ", busquedaTecnicos(args_json))
