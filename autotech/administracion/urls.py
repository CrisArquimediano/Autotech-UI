from rest_framework import routers
from .api import TallerViewSet,TurnoTallerViewSet
from .api import TallerViewSet,TurnoTallerViewSet

router = routers.DefaultRouter()
router.register('talleres_admin', TallerViewSet, 'talleres_admin')
router.register('turnos_admin',TurnoTallerViewSet , 'turnos_admin')

urlpatterns = router.urls
