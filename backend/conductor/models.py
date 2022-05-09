from django.db import models

# Create your models here.
class Conductor(models.Model):
    ''' Modelo para especificar el tipo de contacto'''
    dpi = models.CharField(max_length=16,blank=True,null=True)
    name = models.CharField(max_length=20)
  

    def __str__(self):
        return self.name