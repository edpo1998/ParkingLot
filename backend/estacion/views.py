# Django

# Django RestFramework
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response

# app
from estacion import serializer as serializer_estacion
from estacion import models as models_estacion



class LevelViewSet(viewsets.ModelViewSet):
    queryset =  models_estacion.Level.objects.all()
    serializer_class = serializer_estacion.LevelSerializer

class SectorViewSet(viewsets.ModelViewSet):
    queryset =  models_estacion.Sector.objects.all()
    serializer_class = serializer_estacion.SectorSerializer

class PositionViewSet(viewsets.ModelViewSet):
    queryset =  models_estacion.Position.objects.all()
    serializer_class = serializer_estacion.PositionSerializer

class EstacionViewSet(viewsets.ModelViewSet):
    queryset =  models_estacion.Estacion.objects.all()
    serializer_class = serializer_estacion.EstacionSerializer


class EstacionFreeView(generics.ListAPIView):
    serializer_class = serializer_estacion.EstacionSerializer
    queryset =  models_estacion.Estacion.objects.all()
    
    def get_queryset(self):
        free = models_estacion.Estacion.objects.all().filter(state=False).first()
        free.identificador = str(free)
        return [free]


class EstacionBussyView(generics.ListAPIView):
    serializer_class = serializer_estacion.EstacionSerializer
    queryset =  models_estacion.Estacion.objects.all()
    
    def get_queryset(self):
        bussy = models_estacion.Estacion.objects.all().filter(state=True)
        return bussy

