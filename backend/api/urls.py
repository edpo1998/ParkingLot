
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api import views as apiViews

router = routers.DefaultRouter()
router.register('users',apiViews.UserViewSet)
router.register('roles',apiViews.RolViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
