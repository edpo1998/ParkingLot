# Django


# Django RestFramework
from rest_framework import serializers

# Apps
from caja import models as caja_models

class AccountBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = caja_models.AccountBox
        fields = '__all__'

class DetailBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = caja_models.DetailBox
        fields = '__all__'