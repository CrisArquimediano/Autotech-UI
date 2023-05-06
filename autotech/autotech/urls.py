from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('turnos/', include('turnos.urls')),
    path('admin/', admin.site.urls),
    path('', include('administracion.urls')),
<<<<<<< HEAD
    #path('', include('agenda.urls'))
=======
    path('buscar_tecnicos/', include('busquedatecnicos.urls')),
>>>>>>> main
]
