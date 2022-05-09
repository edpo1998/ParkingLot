from django.db import models
from vehicle.models import Vehicle

class TypeContact(models.Model):
    ''' Modelo para especificar el tipo de contacto'''
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Contact(models.Model):
    ''' Modelo para especificar el tipo de contacto'''
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    contact = models.CharField(max_length=20)
    typecontact = models.ForeignKey(TypeContact, on_delete=models.CASCADE)

    def __str__(self):
        return self.contact