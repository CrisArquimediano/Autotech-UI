import pytest
from datetime import date, timedelta

from agenda.negocio.Agenda import *
from agenda.negocio.Turno import *
#from autotech.agenda.negocio import Turno

# ------------------------------------------------------------- esta disponible -------------------------------------------------------------

def test_esta_disponible_1():
    agenda = Agenda(123, 3)
    hoy = date.today
    # el dia no esta registrado
    assert agenda.esta_disponible(hoy, 9, 3) == True
    
def test_esta_disponible_2():
    agenda = Agenda(123, 3)
    hoy = date.today
    agenda.cargar_turno(Turno(2, hoy, 9, 3, 1, 43911246, "abc123", 3))
    # el dia ya esta registrado y tiene un turno, pero el horario esta disponible
    assert agenda.esta_disponible(hoy, 14, 3) == True
    
def test_esta_disponible_3():
    agenda = Agenda(123, 3)
    hoy = date.today
    agenda.cargar_turno(Turno(2, hoy, 9, 3, 1, 43911246, "abc123", 3))
    # el dia ya esta registrado y tiene un turno, pero el horario no esta disponible al 100%
    assert agenda.esta_disponible(hoy, 10, 3) == False
    
def test_esta_disponible_3():
    agenda = Agenda(123, 3)
    hoy = date.today
    agenda.cargar_turno(Turno(2, hoy, 10, 3, 1, 43911246, "abc123", 3))
    # el dia ya esta registrado y tiene un turno, pero el horario no esta disponible al 100%
    assert agenda.esta_disponible(hoy, 9, 3) == False
    
def test_esta_disponible_4():
    agenda = Agenda(123, 3)
    hoy = date.today
    agenda.cargar_turno(Turno(2, hoy, 9, 3, 1, 43911246, "abc123", 3))
    assert agenda.esta_disponible(hoy, 9, 3) == False
    
    # ------------------------------------------------------------- horarios disponibles -------------------------------------------------------------
    
def test_horarios_disponibles_1():
    agenda = Agenda(123, 3)
    hoy = date.today
    resultado = []
    for i in range(8,17):
        resultado.append([i, 3])
    # el dia no esta registrado
    assert agenda.horarios_disponibles(hoy, 9, 3) == resultado
    
def test_horarios_disponibles_2():
    agenda = Agenda(123, 3)
    hoy = date.today
    
    # los horarios 9, 10 y 11 siguen disponibles, porque tenemos espacio para 3 autos y solo guardamos 1
    agenda.cargar_turno(Turno(2, hoy, 9, 3, 1, "43911247", "abc123", 3))
    
    resultado = []
    for i in range(8,17):
        resultado.append([i, 3])
            
    # el dia ya esta registrado y tiene solo un turno a esa hora, asi que esta todo disponible
    assert agenda.horarios_disponibles(hoy, 14, 3) == resultado
    
def test_horarios_disponibles_3():
    agenda = Agenda(123, 3)
    hoy = date.today
    
    # los horarios 9, 10 y 11 ya no estan disponibles
    agenda.cargar_turno(Turno(1, hoy, 9, 3, 1, "43911246", "abc123", 3))
    agenda.cargar_turno(Turno(2, hoy, 9, 3, 1, "43911247", "abc123", 3))
    agenda.cargar_turno(Turno(3, hoy, 9, 3, 1, "43911248", "abc123", 3))
    
    resultado = []
    for i in range(8,17):
        if i >= 9 and i < 12:
            resultado.append([i, 3])
            
    # el dia ya esta registrado y tiene tres turnos a la misma hora, asi que no esta todo disponible
    assert agenda.horarios_disponibles(hoy, 14, 3) == resultado

# ------------------------------------------------------------- dias y horarios disponibles de varios dias -------------------------------------------------------------
def test_dias_horarios_disponibles_1():
    agenda = Agenda(123, 3)
    hoy = date.today
    maniana = hoy + timedelta(days=1)
    test = agenda.dias_horarios_disponibles_de_varios_dias(hoy, 1) # hoy y mañana
    horas = []
    for i in range(8,17):
        horas.append([i, 3])
    resultado = {hoy: horas, maniana: horas}
    assert test == resultado
    
def test_dias_horarios_disponibles_2():
    agenda = Agenda(123, 3)
    hoy = date.today
    test = agenda.dias_horarios_disponibles_de_varios_dias(hoy, 7) # hoy hasta la semana que viene
    horas = []
    for i in range(8,17):
        horas.append([i, 3])
        resultado = {}
    for i in range(7):
        resultado[hoy] = horas
        hoy += timedelta(days=1)
    assert test == resultado
    
# ------------------------------------------------------------- cargar turno -------------------------------------------------------------
def test_cargar_turno():
    agenda = Agenda(123, 3)
    hoy = date.today
    turno = Turno(1, hoy, 9, 3, 2, "43911246", "abc123", 3)
    agenda.cargar_turno(turno)
    
    assert agenda.turnos == [turno] and len(agenda.turnos) == 1
    
# ------------------------------------------------------------- inicializar horarios -------------------------------------------------------------

# ------------------------------------------------------------- disminuir horarios -------------------------------------------------------------

# ------------------------------------------------------------- eliminar turno -------------------------------------------------------------

# ------------------------------------------------------------- aumentar horarios -------------------------------------------------------------

# ------------------------------------------------------------- obtener inidice -------------------------------------------------------------

# ------------------------------------------------------------- obtener turnos sin tecnico -------------------------------------------------------------

# ------------------------------------------------------------- obtener turnos con tecnico -------------------------------------------------------------

# ------------------------------------------------------------- obtener turnos de tecnico -------------------------------------------------------------

# ------------------------------------------------------------- asignar tecnico -------------------------------------------------------------

# ------------------------------------------------------------- obtener turno por id -------------------------------------------------------------
    
