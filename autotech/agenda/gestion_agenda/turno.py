from typing import Any
from datetime import date
class Turno:
                                                                 # 0: evaluacion, 1: service, 2: reparacion/excepcional 
    def __init__(self, id:int, fecha: date, hora: int, duracion: int, tipo_de_turno:int, dni_cliente: str, patente:str, id_taller:int):
        
        if not self._validos(hora, duracion, tipo_de_turno, dni_cliente, patente):
            raise ValueError("Datos no válidos")
        self.id = id
        self.fecha = fecha
        self.hora = hora
        self.duracion = duracion
        self.tipo = tipo_de_turno
        self.dni_cliente = dni_cliente
        self.patente = patente
        self.dni_tecnico = None
        self.taller_id = id_taller
        
    def _validos(self, hora, duracion, tipo_de_turno, dni_cliente, patente):
        return hora >= 8 and hora <=18 and duracion <= 8 and duracion >= 1 and (tipo_de_turno == 0 or tipo_de_turno == 1 or tipo_de_turno == 2) and len(dni_cliente) == 8 and len(patente) > 0
    
    def asignar_tecnico(self, dni_tecnico):
        self.dni_tecnico = dni_tecnico
        
    def __eq__(self, otro_turno):
        return self.get_id() == otro_turno.get_id() and self.get_fecha() == otro_turno.get_fecha() and self.get_hora() == otro_turno.get_hora() and self.get_duracion() == otro_turno.get_duracion() and self.get_tipo() == otro_turno.get_tipo() and self.get_dni_cliente() == otro_turno.get_dni_cliente() and self.get_patente() == otro_turno.get_patente() and self.get_taller_id() == otro_turno.get_taller_id()
        
    def get_id(self):
        return self.id
    
    def get_fecha(self):
        return self.fecha
    
    def get_hora(self):
        return self.hora
    
    def get_duracion(self):
        return self.duracion
    
    def get_tipo(self):
        return self.tipo
    
    def get_dni_cliente(self):
        return self.dni_cliente
    
    def get_patente(self):
        return self.patente
    
    def get_tecnico(self):
        return self.dni_tecnico
    
    def get_taller_id(self):
        return self.taller_id
    
        