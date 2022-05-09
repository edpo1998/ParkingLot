# Django


# Django RestFramework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Apps
from vehicle import models as vehicle_models

class ModeloSerializer(serializers.ModelSerializer):
    class Meta:
        model = vehicle_models.Modelo
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = vehicle_models.Brand
        fields = '__all__'

class TypePropietarySerializer(serializers.ModelSerializer):
    class Meta:
        model = vehicle_models.TypePropietary
        fields = '__all__'

class TypeVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = vehicle_models.TypeVehicle
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = vehicle_models.Vehicle
        fields = '__all__'