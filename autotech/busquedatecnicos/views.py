from django.shortcuts import render
from rest_framework import viewsets, filters
from models import Tecnico
from serializers import TecnicoSerializer

class BusquedaTecnicosView(viewsets.ReadOnlyModelViewSet):
    queryset = Tecnico.objects.all()
    serializer = TecnicoSerializer

    #filtrado
    filtro = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'anio']
