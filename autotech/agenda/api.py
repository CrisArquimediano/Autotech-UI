from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from rest_framework import viewsets, permissions, status
from .models import Turno_taller
from .serializers import TurnoTallerSerializer

class TurnoTallerViewSet(viewsets.ModelViewSet):
    queryset = Turno_taller.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_classes = TurnoTallerSerializer
    
    # Esto lo vi en "http://blog.enriqueoriol.com/2015/03/django-rest-framework-serializers.html" 
    # Creo que sirve si le pasas un objeto de tipo Turno :s
    @detail_route(methods=['post'])
    def set_comment(self, request, pk=None):
        turno = self.get_object()
        serializer = TurnoTallerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(turno)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  