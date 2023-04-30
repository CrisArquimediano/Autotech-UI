from django.db import models

# Create your models here.
class Tecnicos(models.Model):
    id_empleado = models.CharField(max_length=4, primary_key=True)
    dni = models.CharField(max_length=8)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    categoria = models.CharField(max_length=1)

    def __str__(self) -> str:
        return self.id_empleado.__str__()