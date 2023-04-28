import Turno
from datetime import date
class Agenda:
    
    def __init__(self) -> None:
        self.turnos = []
        self.id_turnos = 0
        
    def agendar_turno(self, fecha: date, hora: int, duracion: int, tipo_de_turno:int, dni_cliente: str, patente:str):
        turno = Turno(self.id_turnos, fecha, hora, duracion, tipo_de_turno, dni_cliente, patente)
        if not self.existe_turno(turno):
            self.turnos.append(turno)
            self.id_turnos += 1
        else:
            raise Exception("Turno duplicado")
        
    def eliminar_turno(self, id_del_turno:int):
        indice_turno = self.indice_turno(id_del_turno)
        if indice_turno != -1:
            self.turnos.pop(indice_turno)
        else:
            raise Exception("No se encontró el turno con ese id")
    
    # El tecnico asignado debe estar disponible en esa franja horaria --> no se si eso es de Agenda o de quien
    def asignar_tecnico(self, id_del_turno, Tecnico):
        turno = self.encontrar_turno(id_del_turno)
        if turno != None:
            turno.asignar_tecnico(Tecnico)
        else:
            raise Exception("No se encontró un turno con ese id")
        
    def existe_turno(self, turno):
        return turno in self.turnos

    def encontrar_turno(self, id_del_turno:int) -> Turno:
        turno = None
        for t in self.turnos:
            if t.get_id() == id_del_turno:
                turno = t
        return turno
    
    def indice_turno(self, id_del_turno:int) -> Turno:
        for i in range (len(self.turnos)):
            if self.turnos[i].get_id() == id_del_turno:
                return i
        return -1
    
    def get_turnos_del_dia(self, dia:date):
        turnos_del_dia = []
        for t in self.turnos:
            if t.get_fecha == dia:
                turnos_del_dia.append(t)
                
    def get_turnos_del_tecnico(self, dni_tecnico:int):
        turnos_del_tecnico = []
        for t in self.turnos:
            if t.get_tecnico == dni_tecnico:
                turnos_del_tecnico.append(t)
    
    def get_turnos(self):
        return self.turnos