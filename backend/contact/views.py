# Django

# Django RestFramework
from rest_framework import viewsets
#from rest_framework.response import Response

# app
from contact import serializer as serializer_contact
from contact import models as models_contact



class TypeContactViewSet(viewsets.ModelViewSet):
    queryset =  models_contact.TypeContact.objects.all()
    serializer_class = serializer_contact.TypeContactSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset =  models_contact.Contact.objects.all()
    serializer_class = serializer_contact.ContactSerializer