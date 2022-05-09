
from django.db import models
from vehicle.models import Vehicle
from django.contrib.auth import get_user_model
from estacion.models import Estacion

# Create your models here.
User = get_user_model()

class Ticket(models.Model):
    codeqr = models.CharField(max_length=100,blank=True,null=True,default="")
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    namedriver = models.CharField(max_length=100,default='Visitante')
    dpi = models.CharField(max_length=100,default='No Provided')
    empleado = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.DecimalField(max_digits=8,decimal_places=2,default=0)
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.id}'


class Registro(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    estacion = models.ForeignKey(Estacion, on_delete=models.CASCADE)
    date_entry = models.DateTimeField(auto_now_add=True)
    date_exit =  models.DateTimeField(blank=True,null=True)
    is_active = models.BooleanField(default=True)
    is_record = models.BooleanField(default=False)
    observations = models.CharField(max_length=100,blank=True,null=True)

    def __str__(self):
        if(self.is_record):
            return f'R-{self.ticket}'
        else:   
            return f'O-{self.ticket}'