
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from contact import views as contactViews

router = routers.DefaultRouter()
router.register('typecontact',contactViews.TypeContactViewSet)
router.register('contact',contactViews.ContactViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
