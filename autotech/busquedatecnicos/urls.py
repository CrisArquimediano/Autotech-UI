from rest_framework import routers
from .api import TecnicoViewSet

router = routers.DefaultRouter()
router.register('api/projects', TecnicoViewSet, 'projects')

urlpatterns = router.urls
