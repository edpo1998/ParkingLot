# Django

# Django RestFramework
from rest_framework import viewsets
#from rest_framework.response import Response

# app
from conductor import serializer as serializer_conductor
from conductor import models as models_conductor

class ConductorViewSet(viewsets.ModelViewSet):
    queryset =  models_conductor.Conductor.objects.all()
    serializer_class = serializer_conductor.ConductorSerializer
