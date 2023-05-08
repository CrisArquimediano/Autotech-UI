from .agenda import Agenda
from datetime import date, timedelta, time
from administracion.models import Taller
from administracion.models import Turno_taller
    
def esta_disponible(dia:date, horario_inicio:time, horario_fin:time, id_taller:str) -> bool:
    agenda = _crear_agenda(id_taller)
    _cargar_turnos(dia, agenda)
    duracion = horario_fin.hour - horario_inicio.hour
    return agenda.esta_disponible(dia, horario_inicio.hour, duracion)

def dias_disponibles_desde_hoy_a_treinta_dias(id_taller: str):
    agenda = _crear_agenda(id_taller)
    _cargar_turnos_desde_hoy_a_treinta_dias(agenda)
    dias_horarios_disponibles = {}
    dias_horarios_disponibles = agenda.dias_horarios_disponibles_de_treinta_dias(date.today())
    return dias_horarios_disponibles

def _crear_agenda(_id_taller: str):
    taller = Taller.objects.get(id_taller = _id_taller)
    capacidad = taller.capacidad
    id = taller.id_taller
    return Agenda(id, capacidad)

def _cargar_turnos_desde_hoy_a_treinta_dias(agenda:Agenda):
    dia = date.today()
    for i in range(30):
        _cargar_turnos(dia, agenda)
        dia = dia + timedelta(days=1) 

def _cargar_turnos(dia:date, agenda:Agenda):
    turnos = Turno_taller.objects.filter(fecha_inicio=dia)
    for turno in turnos:
        duracion = turno.hora_fin.hour - turno.hora_inicio.hour
        agenda.cargar_turno(turno.fecha_inicio, turno.hora_inicio.hour, duracion)
        