import Turno
from datetime import date, timedelta

class Agenda:
    
    def __init__(self, taller_id:int, capacidad:int) -> None:
        self.horarios_ocupados = {} #date->[[8, capacidad], [9, capacidad], [10, capacidad],...]
        self.turnos = []
        self.capacidad = capacidad
        self.taller_id = taller_id
        self.turnos_id = 0
        self.comienzo_horario_de_trabajo: 8
        self.fin_horario_de_trabajo: 17
        
    def esta_disponible(self, dia:date, horario:int, duracion:int) -> bool:
        horarios_del_dia = self.horarios_ocupados.get(dia)
        if  horarios_del_dia is None:
            return True
        esta_disponible = True
        for hora in horarios_del_dia:   # hora: [8, capacidad], [9, capacidad], ... --> hora[0] es la hora, hora[1] es la disponibilidad
            if hora[0] >= horario and hora[0] < horario + duracion: # si la hora está en el tiempo que nos corresponde...
                esta_disponible = esta_disponible and hora[1] > 0
        return esta_disponible
    
    def horarios_disponibles(self, dia:date) -> list:
        horarios_del_dia = self.horarios_ocupados.get(dia)
        horarios_disponibles = []
        if  horarios_del_dia is None:
            for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo):
                horarios_disponibles.append([i, self.capacidad])
        else:
            for hora in horarios_del_dia:
                if hora[1] > 0:
                    horarios_disponibles.append([hora[0], hora[1]])
        return horarios_disponibles
    
    def dias_horarios_disponibles_de_varios_dias(self, dia:date, cant_dias: int) -> dict:
        dias_horarios_disponibles = {}
        dia_a_revisar = dia
        for i in range(cant_dias):
            if dia_a_revisar.isoweekday != 6 and dia_a_revisar.isoweekday != 7: # no trabajamos sabados ni domingos
                horarios_disponibles = self.horarios_disponibles(self, dia_a_revisar)
                dias_horarios_disponibles[dia_a_revisar]= horarios_disponibles
            dia_a_revisar = dia_a_revisar + timedelta(days=1)
        return dias_horarios_disponibles
    
    def cargar_turno(self, turno: Turno):
        self.turnos.append(turno)
        hora_inicio_turno = turno.get_hora(turno)
        hora_fin_turno = hora_inicio_turno + turno.get_duracion(turno)
        dia_turno = turno.get_fecha(turno)
        
        horarios_del_dia = self.horarios_ocupados.get(dia_turno)
        if horarios_del_dia is None:
            self.horarios_ocupados[dia_turno] = self.inicializar_horarios(self, dia_turno)
        self.horarios_ocupados[dia_turno] = self.disminuir_horario(self, dia_turno, hora_inicio_turno, hora_fin_turno)
        
    def inicializar_horarios(self, dia:date):
        horas = []
        for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo):
            hora = [i, self.capacidad]
            horas.append(hora)
        self.horarios_ocupados[dia] = horas
        
    # [[9, capacidad - 1][][]]
    def disminuir_horario(self, dia:date, hora_inicio: int, hora_fin:int):
        horarios_del_dia = self.horarios_ocupados.get(dia)
        for horario in horarios_del_dia:    #[] [] []
            if horario[0] >= hora_inicio and horario[0] < hora_fin:
                horario[1] = horario[1] - 1 # disminuimos la disponibilidad en ese horario
    
    def eliminar_turno(self, turno:Turno):
        hora_inicio_turno = turno.get_hora(turno)
        hora_fin_turno = hora_inicio_turno + turno.get_duracion(turno)
        dia_turno = turno.get_fecha(turno)
        self.horarios_ocupados[dia_turno] = self.aumentar_horario(self, dia_turno, hora_inicio_turno, hora_fin_turno)
        self.turnos.pop(self.obtener_indice(self, turno))
            
    def aumentar_horario(self, dia:date, hora_inicio: int, hora_fin:int):
        horarios_del_dia = self.horarios_ocupados.get(dia)
        for horario in horarios_del_dia:    #[] [] []
            if horario[0] >= hora_inicio and horario[0] < hora_fin:
                horario[1] = horario[1] + 1 # aumentamos la disponibilidad en ese horario
        
    def obtener_indice(self, turno:Turno):
        for i in range(len(self.turnos)):
            if self.turnos[i] == turno.get_id(turno):
                return i
        return -1
        
    def obtener_turnos_sin_tecnico(self) -> list:
        turnos_sin_tecnico = []
        for turno in self.turnos:
            if turno.get_tecnico(turno) == None:
                turnos_sin_tecnico.append(turno)
        return turnos_sin_tecnico
               
    def obtener_turnos_con_tecnico(self) -> list:
        turnos_con_tecnico = []
        for turno in self.turnos:
            if turno.get_tecnico(turno) != None:
                turnos_con_tecnico.append(turno)
        return turnos_con_tecnico
        
    def obtener_turnos_de_tecnico(self, dni_tecnico: str):
        turnos_de_tecnico = []
        for turno in self.turnos:
            if turno.get_tecnico(turno) == dni_tecnico:
                turnos_de_tecnico.append(turno)
        return turnos_de_tecnico
 
    def asignar_tecnico(self, id_turno: int, dni_tecnico: str):
        turno = self.obtener_turno_por_id(self, id_turno)
        if turno is not None:
            turno.asignar_tecnico(dni_tecnico)
        
    def obtener_turno_por_id(self, id_turno:int) -> Turno:
        for turno in self.turnos:
            if turno.get_id(turno) == id_turno:
                return turno
        return None