from rest_framework import viewsets, permissions
from .serializers import TallerSerializer,TurnoTallerSerializer
from .models import Taller, Turno_taller

class TallerViewSet(viewsets.ModelViewSet):
    queryset = Taller.objects.all()
    serializer_class = TallerSerializer
    permission_classes = [permissions.AllowAny]

class TurnoTallerViewSet(viewsets.ModelViewSet):
    queryset = Turno_taller.objects.all()
    serializer_class = TurnoTallerSerializer
    permission_classes = [permissions.AllowAny]