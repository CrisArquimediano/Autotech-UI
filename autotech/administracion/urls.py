from rest_framework import routers
from .api import TallerViewSet,TurnoTallerViewSet

router = routers.DefaultRouter()
router.register('talleres', TallerViewSet, 'talleres')
router.register('turnos', TurnoTallerViewSet, 'turnos')

urlpatterns = router.urls
