# Django


# Django RestFramework
from rest_framework import serializers

# Apps
from estacion import models as estacion_models
from ticket import serializer as ticket_serializer

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = estacion_models.Level
        fields = '__all__'


class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = estacion_models.Sector
        fields = '__all__'

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = estacion_models.Position
        fields = '__all__'

class EstacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = estacion_models.Estacion
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['identificador'] = str(instance)
        return response


