
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from estacion import views as estacionViews

router = routers.DefaultRouter()
router.register('level',estacionViews.LevelViewSet)
router.register('sector',estacionViews.SectorViewSet)
router.register('position',estacionViews.PositionViewSet)
router.register('estacion',estacionViews.EstacionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('estacion/free',estacionViews.EstacionFreeView.as_view(),name="estacionfree"),
    path('estacion/bussy',estacionViews.EstacionBussyView.as_view(),name="estacionbussy")
]
