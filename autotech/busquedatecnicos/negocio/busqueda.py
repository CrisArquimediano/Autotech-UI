import requests

def busqueda_prueba(request):

    datos = request.GET
    
    if 'dni' in request.GET and 'nombre'in request.GET and 'apellido'in request.GET:
        dni = request.GET['document']
        nombre = request.GET['fullname']
        if not (dni or nombre):
            print("dato invalido")

url = 'http://httpbin.org/get'

def get_datosGoogle():
    
    args = { 'nombre': 'Maite', 'curso': 'apis con python'}

    datos = requests.get(url, params=args) #nuestros args, seria los datos que escribiria el usuario

    if datos.status_code == 200:
        contenido_json = datos.json()
        origin = contenido_json['origin'] # --> trae la ip
        print(contenido_json)
        
        """
        if contenido_json:
            for cont in contenido_json:
                print(cont.get('origin'))
        """

if __name__ == '__main__':
    url = "https://www.obuma.cl/ayuda/api-integracion/empleados.list.json"
    datos = requests.get(url)

    if datos.status_code == 200:
        print(datos)

""" 
En caso de haber campos vacio, se ignora la busqueda hasta que complete todo. 
Si todos los campos están vacíos, regresa al formulario de busqueda con un error
"""
def busquedaTecnicos(request):
    errores = []
    datos = requests.get(url, params=request)
    
    if 'dni' in request.GET and 'nombre'in request.GET and 'apellido'in request.GET:
        dni = request.GET['dni']
        nombre = request.GET['nombre']
        apellido = request.GET['apellido']
        if not (dni or nombre or apellido):
            errores.append('Ingresa un valor para la búsqueda.')
        else:
            #no se si anda xd --> aca iria la logica, para traerme de la api los datos que coincidan con el
            #request que esta pasando el usuario

            """for dato in datos:
                print(f"{dato['dni']}  - {dato['nombre']} - : {dato['apellido']}")
            """

            """
            if datos.status_code == 200:
                contenido_json = datos.json()
                origin = contenido_json['origin'] 
                print(contenido_json)
            """


