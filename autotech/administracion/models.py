from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.utils.translation import gettext_lazy as _

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
        PENDIENTE ="pendiente",("Pendiente")
        RECHAZADO = "rechazado",("Rechazado")
        EN_PROCESO = "en_proceso",("En proceso")
        TERMINADO = "terminado",("Terminado")

    
    class TiposTurno(models.TextChoices):
        SERVICE = "service",("Service")
        EVALUACION ="evaluacion",("Evaluacion")
        EXTRAORDINARIO = "extraordinario",("Extraordinario")
        REPARACION = "reparacion", ("Reparacion")

    class Frecuencia_km(models.IntegerChoices):
        FREQ_5000 = 5000, '5.000 KM'
        FREQ_10000 = 10000, '10.000 KM'
        FREQ_15000 = 15000, '15.000 KM'
        FREQ_20000 = 20000, '20.000 KM'
        FREQ_25000 = 25000, '25.000 KM'
        FREQ_30000 = 30000, '30.000 KM'
        FREQ_35000 = 35000, '35.000 KM'
        FREQ_40000 = 40000, '40.000 KM'
        FREQ_45000 = 45000, '45.000 KM'
        FREQ_50000 = 50000, '50.000 KM'
        FREQ_55000 = 55000, '55.000 KM'
        FREQ_60000 = 60000, '60.000 KM'
        FREQ_65000 = 65000, '65.000 KM'
        FREQ_70000 = 70000, '70.000 KM'
        FREQ_75000 = 75000, '75.000 KM'
        FREQ_80000 = 80000, '80.000 KM'
        FREQ_85000 = 85000, '85.000 KM'
        FREQ_90000 = 90000, '90.000 KM'
        FREQ_95000 = 95000, '95.000 KM'
        FREQ_100000 = 100000, '100.000 KM'
        FREQ_105000 = 105000, '105.000 KM'
        FREQ_110000 = 110000, '110.000 KM'
        FREQ_115000 = 115000, '115.000 KM'
        FREQ_120000 = 120000, '120.000 KM'
        FREQ_125000 = 125000, '125.000 KM'
        FREQ_130000 = 130000, '130.000 KM'
        FREQ_135000 = 135000, '135.000 KM'
        FREQ_140000 = 140000, '140.000 KM'
        FREQ_145000 = 145000, '145.000 KM'
        FREQ_150000 = 150000, '150.000 KM'
        FREQ_155000 = 155000, '155.000 KM'
        FREQ_160000 = 160000, '160.000 KM'
        FREQ_165000 = 165000, '165.000 KM'
        FREQ_170000 = 170000, '170.000 KM'
        FREQ_175000 = 175000, '175.000 KM'
        FREQ_180000 = 180000, '180.000 KM'
        FREQ_185000 = 185000, '185.000 KM'
        FREQ_190000 = 190000, '190.000 KM'
        FREQ_195000 = 195000, '195.000 KM'
        FREQ_200000 = 200000, '200.000 KM'

    id_turno = models.IntegerField(primary_key=True, validators=[MinValueValidator(0), MaxValueValidator(999999)])
    tipo = models.CharField(max_length=14, choices=TiposTurno.choices, default=TiposTurno.SERVICE)
    estado = models.CharField(max_length=10, choices=EstadoTurno.choices, default=EstadoTurno.EN_PROCESO)
    taller_id = models.ForeignKey(Taller, on_delete=models.DO_NOTHING)
    tecnico_id = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(999)], null=True, blank=True)
    patente = models.CharField(max_length=7, validators=[patente_regex])
    fecha_inicio = models.DateField(max_length=10)
    hora_inicio = models.TimeField(max_length=8)
    fecha_fin = models.DateField(max_length=10)
    hora_fin = models.TimeField(max_length=8)
    frecuencia_km = models.IntegerField(validators=[MinValueValidator(5000), MaxValueValidator(200000)], choices=Frecuencia_km.choices, null=True, blank=True)
    papeles_en_regla = models.BooleanField(default=False)

# ----------------------------------------------------------------------------------------------------#

""" class Checklist_evaluacion(models.Model):


class Registro_evaluaciones(models.Model):
    id_turno = models.ForeignKey(Turno_taller, on_delete=models.PROTECT)
    id_tarea = models.ForeignKey(Checklist_evaluacion, on_delete=models.PROTECT)
    puntaje_seleccionado = models.IntegerField(validators=[MinValueValidator(-)]) """