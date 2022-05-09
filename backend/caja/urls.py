
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from caja import views as cajaViews

router = routers.DefaultRouter()
router.register('caja',cajaViews.AccountBoxViewSet)
router.register('detail',cajaViews.DetailBoxViewSet)




urlpatterns = [
    path('', include(router.urls)),
]
