
from unicodedata import name
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from ticket import views as ticketViews

router = routers.DefaultRouter()
router.register('ticket',ticketViews.TicketViewSet)
router.register('registro',ticketViews.RegistroViewSet)
router.register('display',ticketViews.ListRegisterBussy)
router.register('detail',ticketViews.DetailTicket,basename="registros")



urlpatterns = [
    path('', include(router.urls)),
]
