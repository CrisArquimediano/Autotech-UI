from rest_framework import routers
from .api import TallerViewSet

router = routers.DefaultRouter()
router.register('talleres', TallerViewSet, 'talleres')
#router.register('turnos', TallerViewSet, 'turnos')

urlpatterns = router.urls
