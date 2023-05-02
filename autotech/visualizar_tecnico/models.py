from django.db import models

class TecnicoModel(models.Model):
    dni = models.CharField(max_length=8) 
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    calificacion = models.CharField(max_length=1)
    contrasena = models.CharField(max_length=20)
    id_taller = models.CharField(max_length=4)
