from rest_framework import routers


router = routers.DefaultRouter()
router.register('talleres', TallerViewSet, 'talleres')

urlpatterns = router.urls
