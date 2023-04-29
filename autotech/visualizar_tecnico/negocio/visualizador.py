


class Tecnico:
    def __init__(self, id:int, nombre:str, apellido:str, cuit:int, calificacion:str):
        id = 1
        nombre = "Joaquin"
        apellido = "Sanchez"
        cuit = 20429480621
        calificacion = "A"

class VisualizadorTecnico():

    def __init__(self, lista_tecnicos):
        lista_tecnicos = lista_tecnicos


tec1 = Tecnico(1,"Joaquin", "Snachez", "20429480621", "A" )
tec2 = Tecnico(2,"Melanie", "Albornoz", "20410535111", "B" )
lista_tec = [tec1, tec2]

visualizador_sin_detalle = VisualizadorTecnico(lista_tec) 