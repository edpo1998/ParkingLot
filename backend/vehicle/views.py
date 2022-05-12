# Django

# Django RestFramework
from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response

# app
from vehicle import serializer as serializer_vehicle
from vehicle import models as models_vehicle



class ModeloViewSet(viewsets.ModelViewSet):
    queryset =  models_vehicle.Modelo.objects.all()
    serializer_class = serializer_vehicle.ModeloSerializer

class BrandViewSet(viewsets.ModelViewSet):
    queryset =  models_vehicle.Brand.objects.all()
    serializer_class = serializer_vehicle.BrandSerializer

class TypeVehicleViewSet(viewsets.ModelViewSet):
    queryset =  models_vehicle.TypeVehicle.objects.all()
    serializer_class = serializer_vehicle.TypeVehicleSerializer

class TypePropietaryViewSet(viewsets.ModelViewSet):
    queryset =  models_vehicle.TypePropietary.objects.all()
    serializer_class = serializer_vehicle.TypePropietarySerializer

class VehicleViewSet(viewsets.ModelViewSet):
    queryset =  models_vehicle.Vehicle.objects.all()
    serializer_class = serializer_vehicle.VehicleSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            vehiculo = self.get_object()
            vehiculo.is_active = False
            vehiculo.save()
            return Response({
                "error": False,
                "message": "Vehiculo dado de baja"
                })
        except:
            return Response({
                "error": False,
                "message": "Ocurrio un error al dar de baja al vehiculo"
                })



    