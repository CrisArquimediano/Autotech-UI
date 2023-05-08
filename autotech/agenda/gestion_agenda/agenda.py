from datetime import date, timedelta

class Agenda:
    
    def __init__(self, taller_id:str, capacidad:int) -> None:
        self.horarios_ocupados = {} #date->[[8, capacidad], [9, capacidad], [10, capacidad],...]
        self.capacidad = capacidad
        self.taller_id = taller_id
        self.comienzo_horario_de_trabajo= 8
        self.fin_horario_de_trabajo= 17
        self.fin_horario_de_trabajo_domingos= 12
        
    def esta_disponible(self, dia:date, horario:int, duracion:int) -> bool:
        horarios_del_dia = self.horarios_ocupados.get(dia)
        if  horarios_del_dia == None:
            return True
        esta_disponible = True
        for hora in horarios_del_dia:   # hora: [8, capacidad], [9, capacidad], ... --> hora[0] es la hora, hora[1] es la disponibilidad
            if hora[0] >= horario and hora[0] < horario + duracion: # si la hora está en el tiempo que nos corresponde...
                esta_disponible = esta_disponible and hora[1] > 0
        return esta_disponible
    
    def horarios_disponibles(self, dia:date) -> list:
        horarios_del_dia = self.horarios_ocupados.get(dia)
        dia_de_la_semana = dia.weekday()
        horarios_disponibles = []
        if  horarios_del_dia == None:
            if dia_de_la_semana != 6:
                for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo):
                    horarios_disponibles.append([i, self.capacidad])
            else:
                for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo_domingos):
                    horarios_disponibles.append([i, self.capacidad])
        else:
            for hora in horarios_del_dia: #[8,1][][]
                if hora[1] > 0:
                    horarios_disponibles.append(hora) # [8, 1]
        return horarios_disponibles
    
    def dias_horarios_disponibles_de_treinta_dias(self, dia:date) -> dict:
        dias_horarios_disponibles = {}
        dia_a_revisar = dia
        for i in range(30):
            horarios_disponibles = self.horarios_disponibles(dia_a_revisar)
            dias_horarios_disponibles[dia_a_revisar]= horarios_disponibles
            dia_a_revisar = dia_a_revisar + timedelta(days=1)
        return dias_horarios_disponibles
    
    def cargar_turno(self, dia:date, hora:int, cant_horas:int):
        dia_de_la_semana = dia.weekday()
        hora_fin_turno = hora + cant_horas
        horarios_del_dia = self.horarios_ocupados.get(dia)
        if  dia_de_la_semana != 6 and hora + cant_horas > self.fin_horario_de_trabajo:
            raise ValueError("La duración del turno excede la jornada laboral.")
        if  dia_de_la_semana == 6 and hora + cant_horas > self.fin_horario_de_trabajo_domingos:
            raise ValueError("La duración del turno excede la jornada laboral.")
        if horarios_del_dia == None:
            self._inicializar_horarios(dia)
        self._disminuir_horario(dia, hora, hora_fin_turno)
        
    def _inicializar_horarios(self, dia:date):
        dia_de_la_semana = dia.weekday()
        horas = []
        if dia_de_la_semana != 6:
            for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo):
                hora = [i, self.capacidad]
                horas.append(hora)
        else:
            for i in range(self.comienzo_horario_de_trabajo,self.fin_horario_de_trabajo_domingos):
                hora = [i, self.capacidad]
                horas.append(hora)
        self.horarios_ocupados[dia] = horas
        
    # [[9, capacidad - 1][][]]
    def _disminuir_horario(self, dia:date, hora_inicio: int, hora_fin:int):
        horarios_del_dia = self.horarios_ocupados.get(dia)
        for horario in horarios_del_dia:    #[] [] []
            if horario[0] >= hora_inicio and horario[0] < hora_fin:
                horario[1] = horario[1] - 1 # disminuimos la disponibilidad en ese horario
    
    def eliminar_turno(self, dia:date, hora:int, cant_horas:int):
        hora_fin_turno = hora + cant_horas
        self._aumentar_horario(dia, hora, hora_fin_turno)
            
    def _aumentar_horario(self, dia:date, hora_inicio: int, hora_fin:int):
        horarios_del_dia = self.horarios_ocupados.get(dia)
        for horario in horarios_del_dia:    #[] [] []
            if horario[0] >= hora_inicio and horario[0] < hora_fin:
                horario[1] = horario[1] + 1 # aumentamos la disponibilidad en ese horario
     