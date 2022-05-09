# Django
from django.contrib.auth import get_user_model

# Django RestFramework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

# Apps
from api import models as api_models

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Rol
        fields = '__all__'

User = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name','username','surname','rol','password']
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user




