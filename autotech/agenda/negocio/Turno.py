from typing import Any
from datetime import date
class Turno:
                                                    # 0: evaluacion, 1: service  
    def __init__(self, id:int, fecha: date, hora: int, duracion: int, tipo_de_turno:int, dni_cliente: str, patente:str):
        
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
        
    def _validos(hora, duracion, tipo_de_turno, dni_cliente, patente):
        return id != None and hora >= 8 and hora <=18 and duracion <= 8 and duracion >= 1 and (tipo_de_turno == 0 or tipo_de_turno == 1) and len(dni_cliente) == 8 and len(patente) > 0
    
    def asignar_tecnico(self, dni_tecnico):
        self.dni_tecnico = dni_tecnico
        
    def __eq__(self, otro_turno):
        return self.get_id(self) == self.get_id(otro_turno) and self.get_fecha(self) == otro_turno.get_fecha(otro_turno) and self.get_hora(self) == otro_turno.get_hora(otro_turno) and self.get_duracion(self) == otro_turno.get_duracion(otro_turno) and self.get_tipo(self) == otro_turno.get_tipo(otro_turno) and self.get_dni_cliente(self) == otro_turno.get_dni_cliente(otro_turno) and self.get_patente(self) == otro_turno.get_patente(otro_turno)
        
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
        