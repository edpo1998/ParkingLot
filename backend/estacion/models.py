from turtle import position
from django.db import models

# Create your models here.

class Level(models.Model):
    ''' Modelo para especificar el modelo del vehiculo'''
    level = models.IntegerField()
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return str(self.level)

class Sector(models.Model):
    ''' Modelo para especificar la marca del vehiculo'''
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return self.name


class Position(models.Model):
    ''' Modelo para especificar el modelo del vehiculo'''
    level = models.IntegerField()
    description = models.CharField(max_length=150,blank=True,null=True)
    
    def __str__(self):
        return str(self.level)




class Estacion(models.Model):
    class Meta:
        unique_together = (('level', 'sector','number','position'))
        
    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    sector = models.ForeignKey(Sector, on_delete=models.CASCADE)
    number = models.IntegerField()
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    state = models.BooleanField(default=False)
    description = models.CharField(max_length=150,blank=True,null=True)

    def __str__(self):
        return f'{self.level}-{self.sector}{self.number}-{self.position}'