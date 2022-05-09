from datetime import datetime, timezone
# Django

# Django RestFramework

from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
# app
from ticket import serializer as serializer_ticket
from ticket import models as models_ticket
# vehicle
from vehicle import models as v_models
from vehicle import serializer as s_vehicle

# estacion
from estacion import models as estacion_models

# ticket
from ticket.template import TemplateResponse 

# Caja
from caja import models as models_caja

class TicketViewSet(viewsets.ModelViewSet):
    queryset =  models_ticket.Ticket.objects.all()
    serializer_class = serializer_ticket.TicketSerializer

    def create(self, request, *args, **kwargs):
        body = request.data
        vehiculo = v_models.Vehicle.objects.all().filter(badgenumber=body['vehicle']).first()
        
        if (vehiculo is not None):
            if(str(vehiculo.typepropietary) == "Residente"): #Es Residente
                body["is_active"] = True
            body["vehicle"] = int(vehiculo.id)
            body["empleado"] = int(body["empleado"])
            body["estacion"] = int(body["estacion"])
        else:
            response= TemplateResponse(
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
                message="Placa Inexistente",
                body={})
            return Response(response.getResponse())
 
        serializer = self.serializer_class(data=body)
        if serializer.is_valid():
            response= TemplateResponse(
                    status=status.HTTP_200_OK,
                    error=False,
                    message="Success",
                body=body)
            try:
                idticket = serializer.save()
                verify_type = False
                if(str(vehiculo.typepropietary) == "Residente"):
                   verify_type = True
                serializer_registro = serializer_ticket.RegistroSerializer(data={
                    "ticket": str(idticket),
                    "estacion": body['estacion'],
                    "is_record":verify_type
                })
                if serializer_registro.is_valid():
                    serializer_registro.save()
                    estacionbussy = estacion_models.Estacion.objects.get(id=body['estacion'])
                    estacionbussy.state = True
                    estacionbussy.save() 
                else:
                  response= TemplateResponse(
                    status=status.HTTP_400_BAD_REQUEST,
                    error=True,
                    message="Formato de Datos Invalidos en Registro",
                    body={})  
            except ValueError as ve:
                print(ve)
            return Response(response.getResponse())
        else:
            response= TemplateResponse(
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
                message="Formato de Datos Invalidos",
                body={})
            return Response(response.getResponse())





class ListRegisterBussy(viewsets.ModelViewSet):
    queryset =  models_ticket.Registro.objects.all()
    serializer_class = serializer_ticket.RegistroDisplaySerializer

    def create(self, request, *args, **kwargs):
        ''' Datos importantes '''
        # Obtener Registro
        ideregister = int(request.data["id_register"]) 
        data_register = models_ticket.Registro.objects.all().filter(is_active=True).filter(id=ideregister).first()
        # Obtener Estacion
        estacion = data_register.estacion
        # Obtener Ticket
        ticket = data_register.ticket
        # Obtener Vehiculo
        vehiculo = data_register.ticket.vehicle
        # Caja habilitada 
        caja = models_caja.AccountBox.objects.all().filter(is_active=True).last()

        ''' Calculo del tiempo consumido y precio '''
        # Calcular numero de minutos
        now = datetime.now(timezone.utc)
        minutes = (now-data_register.date_entry).total_seconds()/60
        # Calcular pago
        pay = round(float(minutes) * float(vehiculo.typepropietary.fee), 1)

        ''' Logica del sistema de tickets'''
        # Los pagos siempre se acumularan en el ticket
        ticket.total  = float(ticket.total) +float(pay)
        ticket.save() 
        
        # Si no es residente el pago se realiza de inmediato, no se sigue
        # acumulando en el ticket activo y se lleva el registro a la caja activa
        if(not data_register.is_record): 
            registrocaja = models_caja.DetailBox(accountbox=caja,ticket=ticket)
            registrocaja.save()

        # Aca es importante mencionar que los tickets en el campo is_active
        # es solo para residentes y se liberan en el pago mensual asi que 
        # no es necesario liberarlo ya que si no lo es el pago es inmediato

        # Liberar Registro de Salida 
        data_register.date_exit = now
        data_register.is_active = False
        data_register.save()

        # Liberar Estacion
        estacion.state =False
        estacion.save()

        serializer = self.serializer_class([data_register], many=True)
        response= TemplateResponse(
                    status=status.HTTP_200_OK,
                    error=False,
                    message="Success",
                    body= serializer.data)  
        return Response(response.getResponse())



    def list(self,request):
        data = models_ticket.Registro.objects.all().filter(is_active=True)
        serializer = self.serializer_class(data, many=True)
        response= TemplateResponse(
                    status=status.HTTP_200_OK,
                    error=False,
                    message="Success",
                    body= serializer.data)  

        return Response(response.getResponse())

class RegistroViewSet(viewsets.ModelViewSet):
    queryset =  models_ticket.Registro.objects.all()
    serializer_class = serializer_ticket.RegistroSerializer


class DetailTicket(viewsets.ModelViewSet):
    queryset =  models_ticket.Registro.objects.all()
    serializer_class = serializer_ticket.DetailTicketSerializer

    def list(self,request):
        data = models_ticket.Registro.objects.all()
        serializer = self.serializer_class(data, many=True)
        response= TemplateResponse(
                    status=status.HTTP_200_OK,
                    error=False,
                    message="Success",
                    body= serializer.data)  
        return Response(response.getResponse())
        




