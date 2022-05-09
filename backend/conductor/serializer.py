# Django


# Django RestFramework
from rest_framework import serializers
# Apps
from conductor import models as conductor_models

class ConductorSerializer(serializers.ModelSerializer):
    class Meta:
        model = conductor_models.Conductor
        fields = '__all__'