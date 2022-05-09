from django.db import models

# Create your models here.

class Modelo(models.Model):
    ''' Modelo para especificar el modelo del vehiculo'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return self.name

class Brand(models.Model):
    ''' Modelo para especificar la marca del vehiculo'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return self.name


class TypeVehicle(models.Model):
    ''' Modelo para especificar el tipo de vehiculo'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    surcharge = models.DecimalField(max_digits=4,decimal_places=2,default=0)

    def __str__(self):
        return self.name

class TypePropietary(models.Model):
    ''' Modelo para especificar el tipo de propietario'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    fee = models.DecimalField(max_digits=4,decimal_places=2,default=0)
    
    def __str__(self):
        return self.name


class Vehicle(models.Model):
    badgenumber = models.CharField(max_length=16,unique=True)
    modelo = models.ForeignKey(Modelo, on_delete=models.CASCADE,blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE,blank=True, null=True)
    typevehicle =  models.ForeignKey(TypeVehicle, on_delete=models.CASCADE,blank=True, null=True)
    typepropietary =  models.ForeignKey(TypePropietary, on_delete=models.CASCADE,blank=True, null=True)
    description = models.CharField(max_length=150,blank=True,null=True)

    def __str__(self):
        return self.badgenumber


class ExtensionVehicle(Vehicle):
    class Meta:
        proxy = True

        