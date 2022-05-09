from django.db import models
from ticket.models import Ticket
# Create your models here.
class AccountBox(models.Model):
    date_open = models.DateTimeField(auto_now_add=True)
    date_close =  models.DateTimeField(auto_now=True)
    activo = models.DecimalField(max_digits=8,decimal_places=2,default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id}'


class DetailBox(models.Model):
    accountbox = models.ForeignKey(AccountBox, on_delete=models.CASCADE)
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    observations = models.CharField(max_length=100,blank=True,null=True)


    def __str__(self):
        return f'{self.ticket}'