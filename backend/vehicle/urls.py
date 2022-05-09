
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from vehicle import views as vehicleViews

router = routers.DefaultRouter()
router.register('modelo',vehicleViews.ModeloViewSet)
router.register('brand',vehicleViews.BrandViewSet)
router.register('typevehicle',vehicleViews.TypeVehicleViewSet)
router.register('typepropietary',vehicleViews.TypePropietaryViewSet)
router.register('vehicle',vehicleViews.VehicleViewSet)




urlpatterns = [
    path('', include(router.urls))
]
