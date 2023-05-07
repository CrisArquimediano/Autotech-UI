from django.db import models

# Create your models here.
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _


# id_taller:char, nombre:char, id_direccion:int, mail:char, telefono:char,
# id_sucursal:char, capacidad:int, cant_tecnicos:int
# Create your models here.

id_taller_regex = RegexValidator(
        '^T\d{3}$',
        message="El ID del taller debe tener el formato T001",
        code="invalid_id_taller")

nombre_taller_regex = RegexValidator(
        regex='^[a-zA-Z0-9]+$',
        message="El nombre de taller debe tener solo numeros y letras",
        code="invalid_nombre_taller")

telefono_regex = RegexValidator(
    regex='^\+?1?\d{9,15}$',
    message="El número de teléfono debe tener el formato +1234567890 y contener de 9 a 15 dígitos.",
    code="invalid_phone_number")

id_sucursal_regex = RegexValidator(
        '^S\d{3}$',
        message="El ID de sucursal debe tener el formato S001",
        code="invalid_id_sucursal")

patente_regex = RegexValidator(
    '^(([A-Z]{2}\d{3}[A-Z]{2})|([A-Z]{3}\d{3}))$',
    message="La patente ingresada no es valida. Debe ser en mayusculas con el formato 00AAA00 o ",
    code="invalid_patente")
# ----------------------------------------------------------------------------------------------------#

class Taller(models.Model):
    id_taller = models.CharField(max_length=4, primary_key=True, validators=[id_taller_regex])
    nombre = models.CharField(max_length=50, validators=[nombre_taller_regex])
    id_direccion = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(999)])
    mail = models.EmailField()
    telefono = models.CharField(max_length=15, validators=[telefono_regex])
    id_sucursal = models.CharField(max_length=4, validators=[id_sucursal_regex])
    capacidad = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(15)])
    cant_tecnicos = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(45)])

# ----------------------------------------------------------------------------------------------------#

class Turno_taller(models.Model):
    
    class EstadoTurno(models.TextChoices):
        RECHAZADO = "rechazado",("Rechazado")
        PENDIENTE ="pendiente",("Pendiente")
        EN_PROCESO = "en_proceso",("En proceso")
        TERMINADO = "terminado",("Terminado")

    
    class TiposTurno(models.TextChoices):
        SERVICE = "service",("Service")
        EVALUACION ="evaluacion",("Evaluacion")
        EXTRAORDINARIO = "extraordinario",("Extraordinario")


    id_turno = models.IntegerField(primary_key=True, validators=[MinValueValidator(0), MaxValueValidator(99999999)])
    tipo = models.CharField(max_length=14, choices=TiposTurno.choices)
    estado = models.CharField(max_length=10, choices=EstadoTurno.choices, default=EstadoTurno.PENDIENTE)
    taller_id = models.ForeignKey(Taller, on_delete=models.DO_NOTHING)
    tecnico_id = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(999)])
    patente = models.CharField(max_length=7, validators=[patente_regex])
    fecha_inicio = models.DateField(max_length=10)
    hora_inicio = models.TimeField(max_length=8)
    fecha_fin = models.DateField(max_length=10)
    hora_fin = models.TimeField(max_length=8)
    papeles_en_regla = models.BooleanField(default=False)