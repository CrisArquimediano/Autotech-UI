import pytest
from datetime import date, timedelta

from agenda  import *

# ------------------------------------------------------------- esta disponible -------------------------------------------------------------
def test_esta_disponible_1():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    # el dia no esta registrado
    assert agenda.esta_disponible(hoy, 9, 3) == True
    
def test_esta_disponible_2():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    # el dia ya esta registrado y tiene un turno, pero el horario esta disponible
    assert agenda.esta_disponible(hoy, 14, 3) == True
    
def test_esta_disponible_3():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    # el dia ya esta registrado y tiene un turno, pero el horario no esta disponible al 100%
    assert agenda.esta_disponible(hoy, 10, 3) == False
    
def test_esta_disponible_4():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    # el dia ya esta registrado y tiene un turno, pero el horario no esta disponible
    assert agenda.esta_disponible(hoy, 9, 3) == False
    
    # ------------------------------------------------------------- horarios disponibles -------------------------------------------------------------
def test_horarios_disponibles_1():
    agenda = Agenda("123", 3)
    hoy = date(2023,5,4) # jueves
    resultado = []
    for i in range(8,17):
        resultado.append([i, 3])
    # el dia no esta registrado
    assert agenda.horarios_disponibles(hoy) == resultado
    
def test_horarios_disponibles_2():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    # los horarios 9, 10 y 11 siguen disponibles, porque tenemos espacio para 3 autos y solo guardamos 1
    agenda.cargar_turno(hoy, 9, 3)
    resultado = []
    for i in range(8,17):
        if i < 9 or i >= 12:
            resultado.append([i, 3])
        else:
            resultado.append([i,2])
    # el dia ya esta registrado y tiene solo un turno a esa hora, asi que esta todo disponible
    assert agenda.horarios_disponibles(hoy) == resultado
    
def test_horarios_disponibles_3():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    # los horarios 9, 10 y 11 ya no estan disponibles
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    agenda.cargar_turno(hoy, 9, 3)
    
    resultado = []
    for i in range(8,17):
        if i < 9 or i > 11:
            resultado.append([i, 3])
    # el dia ya esta registrado y tiene tres turnos a la misma hora, asi que no esta todo disponible
    assert agenda.horarios_disponibles(hoy) == resultado

def test_horarios_disponibles_4():
    agenda = Agenda("123", 3)
    hoy = date(2023,5,7) # domingo
    resultado = []
    for i in range(8,12):
        resultado.append([i, 3])
    # el dia no esta registrado
    assert agenda.horarios_disponibles(hoy) == resultado

# ------------------------------------------------------------- dias y horarios disponibles de varios dias -------------------------------------------------------------    
def test_dias_horarios_disponibles_de_treinta_dias_1():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    test = agenda.dias_horarios_disponibles_de_treinta_dias(hoy)
    
    horas_semana = []
    for i in range(8,17):
        horas_semana.append([i, 3])
    horas_domingo = []
    for i in range(8,12):
        horas_domingo.append([i, 3])
        
    resultado = {}
    for i in range(30):
        if hoy.weekday() == 6:
            resultado[hoy] = horas_domingo
        else:
            resultado[hoy] = horas_semana
        hoy += timedelta(days=1)
    assert test == resultado
    
# ------------------------------------------------------------- cargar turno -------------------------------------------------------------
def test_cargar_turno_1():
    agenda = Agenda("123",3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    resultado = []
    for i in range(8,17):
        if i < 9 or i >= 12:
            resultado.append([i, 3])
        else:
            resultado.append([i,2])
    
    assert agenda.horarios_ocupados.get(hoy) == resultado
    
def test_cargar_turno_2(): # el turno supera el dia laboral
    agenda = Agenda("123",3)
    hoy = date(2023, 5, 8) # lunes
    
    with pytest.raises(ValueError) as exc_info:
        agenda.cargar_turno(hoy, 15, 3)
    assert str(exc_info.value) == "La duración del turno excede la jornada laboral."

def test_cargar_turno_3():
    agenda = Agenda("123",3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 14, 3)
    resultado = []
    for i in range(8,17):
        if i < 14 or i >= 17:
            resultado.append([i, 3])
        else:
            resultado.append([i,2])
    
    assert agenda.horarios_ocupados.get(hoy) == resultado
    
# ------------------------------------------------------------- inicializar horarios -------------------------------------------------------------
def test_inicializar_horarios_1():
    agenda = Agenda("123", 3)
    dia = date(2023, 5, 8) # lunes
    agenda._inicializar_horarios(dia)
    horas = []
    for i in range(8,17):
        horas.append([i,3])
    
    assert agenda.horarios_ocupados.get(dia) == horas
    
def test_inicializar_horarios_2():
    agenda = Agenda("123", 3)
    dia = date(2023, 5, 7) # domingo
    agenda._inicializar_horarios(dia)
    horas = []
    for i in range(8,12):
        horas.append([i,3])
    
    assert agenda.horarios_ocupados.get(dia) == horas

# ------------------------------------------------------------- disminuir horarios -------------------------------------------------------------
def test_disminuir_horarios():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    horarios_ocupados_hoy = agenda.horarios_ocupados.get(hoy)
    resultado = horarios_ocupados_hoy[1][1]
    
    assert resultado == 2
# ------------------------------------------------------------- eliminar turno -------------------------------------------------------------
def test_eliminar_turno_1():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    agenda.eliminar_turno(hoy, 9, 3)
    resultado = []
    for i in range(8,17):
        resultado.append([i,3])
    
    assert agenda.horarios_ocupados.get(hoy) == resultado
    
def test_eliminar_turno_2():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 7) # domingo
    agenda.cargar_turno(hoy, 9, 3)
    agenda.eliminar_turno(hoy, 9, 3)
    resultado = []
    for i in range(8,12):
        resultado.append([i,3])
    
    assert agenda.horarios_ocupados.get(hoy) == resultado

# ------------------------------------------------------------- aumentar horarios -------------------------------------------------------------
def test_aumentar_horarios():
    agenda = Agenda("123", 3)
    hoy = date(2023, 5, 8) # lunes
    agenda.cargar_turno(hoy, 9, 3)
    agenda.eliminar_turno(hoy, 9, 3)
    horarios_ocupados_hoy = agenda.horarios_ocupados.get(hoy)
    resultado = horarios_ocupados_hoy[1][1]
    
    assert resultado == 3
