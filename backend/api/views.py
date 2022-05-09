# Django
from django.contrib.auth import get_user_model

# Django RestFramework
from rest_framework import viewsets
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

# app
from api import serializer as serializer_api
from api import models as models_api

User = get_user_model()
class UserViewSet(viewsets.ModelViewSet):
    queryset =  User.objects.all()
    serializer_class = serializer_api.UserSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset =  models_api.Rol.objects.all()
    serializer_class = serializer_api.RolSerializer

    #def create(self, request):
    #    print(request.data)
    #    return Response({})
        
class UserAuthToken(ObtainAuthToken):

    def getResponseTemplate(self,authentication,message,data):
        ''' Clase Plantilla'''
        return({
            'authentication': authentication,
            'message':message,
            'data': data
        })

    def post(self, request, *args, **kwargs):
        
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})

        if not serializer.is_valid():
            return Response(self.getResponseTemplate(False,"Invalid Credentials",None))

        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(self.getResponseTemplate(True,"Authentication Succesful",{
            'token': token.key,
            'email': user.email,
            'name': user.name,
            'rol': str(user.rol),
            'id':str(user.id)
        }))