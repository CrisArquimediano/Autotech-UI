from django.db import models

# Create your models here.
class Tecnico(models.Model):
    dni = models.CharField(primary_key=True, max_length=8)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    categoria = models.CharField(max_length=1)
    
    def __str__(self) -> str:
        return self.dni.__str__()