# Django

# Django RestFramework
from rest_framework import viewsets
#from rest_framework.response import Response

# app
from caja import serializer as serializer_caja
from caja import models as models_caja



class AccountBoxViewSet(viewsets.ModelViewSet):
    queryset =  models_caja.AccountBox.objects.all()
    serializer_class = serializer_caja.AccountBoxSerializer

class DetailBoxViewSet(viewsets.ModelViewSet):
    queryset =  models_caja.DetailBox.objects.all()
    serializer_class = serializer_caja.DetailBoxSerializer
