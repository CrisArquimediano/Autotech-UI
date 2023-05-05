from django.db import models

# Create your models here.
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator


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
    id_turno = models.IntegerField(primary_key=True, validators=[MinValueValidator(0), MaxValueValidator(99999999)])
    tipo = models.CharField(max_length=30)
    estado = models.CharField(max_length=30)
    taller_id = models.ForeignKey(Taller, on_delete=models.DO_NOTHING)
    tecnico_id = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(999)])
    patente = models.CharField(max_length=30)
    fecha_inicio = models.DateField(max_length=30)
    hora_inicio = models.TimeField(max_length=30)
    fecha_fin = models.DateField(max_length=30)
    hora_fin = models.TimeField(max_length=30)
    papeles_en_regla = models.BooleanField(default=False)