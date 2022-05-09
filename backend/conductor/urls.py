
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from conductor import views as conductorViews

router = routers.DefaultRouter()
router.register('conductor',conductorViews.ConductorViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
