from rest_framework import routers
from .api import TallerViewSet

router = routers.DefaultRouter()
router.register('talleres', TallerViewSet, 'talleres')

urlpatterns = router.urls
