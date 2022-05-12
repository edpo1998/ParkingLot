
from unicodedata import name
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from ticket import views as ticketViews

router = routers.DefaultRouter()
router.register('ticket',ticketViews.TicketViewSet)
router.register('registro',ticketViews.RegistroViewSet,basename="todos los registros")
router.register('display',ticketViews.ListRegisterBussy,basename="ocupados")
router.register('detail',ticketViews.DetailTicket,basename="registros")
router.register('seebussy',ticketViews.SeeBussy,basename="seebussy")
router.register('residente',ticketViews.TicketResidenteViewSet,basename="residentes")




urlpatterns = [
    path('', include(router.urls)),
]
