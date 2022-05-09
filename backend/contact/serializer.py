# Django


# Django RestFramework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Apps
from contact import models as contact_models

class TypeContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = contact_models.TypeContact
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = contact_models.Contact
        fields = '__all__'