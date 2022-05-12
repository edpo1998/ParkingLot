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
        """
            El ticket pasa adquiriendo los parametros necesarios
            pasando por validaciones las cuales en caso de que no
            se cumplan se interrumpe el proceso de adquisicion de los
            mismo y se retorna una plantilla con el informe del mensaje
            de error que se produjo, de lo contrario si cumple con 
            todo al final se retorna la respuesta y los datos del ticket
        """
        # Parametros para la creacion del Ticket
        body = request.data # Datos recibidos
        newticket = {}      # Estructura para crear el ticket

    
        # Traer vehiculo con placa existente
        vehiculo = v_models.Vehicle.objects.all().filter(badgenumber=body['vehicle']).first()

        # Verificar que el vehiculo no este dado de baja
        if(vehiculo.is_active == False):
            response= TemplateResponse(
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
                message="Vehiculo de baja",
                body={})
            return Response(response.getResponse())

        if (vehiculo is not None):      
            # Verificar que el auto este desocupado
            if(vehiculo.state):
                # Si es residente el Ticket se mantendra activo
                if(str(vehiculo.typepropietary) == "Residente"): #Es Residente
                    newticket["is_active"] = True
                # En caso de que no sea residente el ticket no mantendra un historial
                # Por lo tanto el estado del ticket permanece inactivo
                newticket["is_active"] = False
                newticket["vehicle"] = int(vehiculo.id)
                newticket["empleado"] = int(body["empleado"])
                newticket["estacion"] = int(body["estacion"])
            else:
                response= TemplateResponse(
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
                message="Inconscistencia, el vehiculo se encuentra en el parqueo",
                body={})
                return Response(response.getResponse())

        else:
            response= TemplateResponse(
                status=status.HTTP_400_BAD_REQUEST,
                error=True,
                message="Placa Inexistente",
                body={})
            return Response(response.getResponse())
 

        # Una vez validados los parametros procedemos a ejecutar la consulta
        """
            {
                is_active : Boolean ,
                vehicle: id ,
                empleado: id ,
                estacion: id ,
            }
        """
        # Verificar que el carro no tenga ticket en existencia
        ticke_active = models_ticket.Ticket.objects.all().filter(vehicle=vehiculo.id,is_active=True).first()

        # Tiene un ticket en existencia
        if (ticke_active is not None):
            try:
                idticket = ticke_active
                serializer_registro = serializer_ticket.RegistroSerializer(data={
                    "ticket": str(idticket),
                    "estacion": newticket['estacion'],
                    "is_record":True
                    })
                if serializer_registro.is_valid():
                    serializer_registro.save() 
                    estacionbussy = estacion_models.Estacion.objects.get(id=newticket['estacion']) 
                    estacionbussy.state = True
                    estacionbussy.save()
                    newticket["ticket"] = idticket.id
                    newticket["namevehiculo"] = str(vehiculo)
                    newticket["nameestacion"] = str(estacionbussy) 
                    newticket["ingreso"] = str(serializer_registro.data["date_entry"])
                else:
                    response= TemplateResponse(
                        status=status.HTTP_400_BAD_REQUEST,
                        error=True,
                        message="Formato de Datos Invalidos en Registro",
                        body={})
            except ValueError as ve:
                print(ve)
            # Ponemos el carro en estado de "No ha salido"
            vehiculo.state = False
            vehiculo.save()
            ## Ticket Activo de un residente
            response= TemplateResponse(
                        status=status.HTTP_200_OK,
                        error=False,
                        message="Success Residente",
                        body=newticket)
            return Response(response.getResponse())
        else:
            # Validamos los datos para poder procesar y generar un nuevo ticket
            serializer = self.serializer_class(data=newticket)
            if serializer.is_valid():
                try:
                    idticket = serializer.save()
                    verify_type = False
                    if(str(vehiculo.typepropietary) == "Residente" or vehiculo.typepropietary==1):
                        verify_type = True
                        idticket.is_active = True
                        idticket.save()
                    serializer_registro = serializer_ticket.RegistroSerializer(data={
                        "ticket": str(idticket),
                        "estacion": newticket['estacion'],
                        "is_record":verify_type
                       })
                    if serializer_registro.is_valid():
                       serializer_registro.save()
                       estacionbussy = estacion_models.Estacion.objects.get(id=newticket['estacion'])
                       estacionbussy.state = True
                       estacionbussy.save() 
                       newticket["ticket"] = idticket.id
                       newticket["namevehiculo"] = str(vehiculo)
                       newticket["nameestacion"] = str(estacionbussy) 
                       newticket["ingreso"] = str(serializer_registro.data["date_entry"])
                    else:
                        response= TemplateResponse(
                            status=status.HTTP_400_BAD_REQUEST,
                            error=True,
                            message="Formato de Datos Invalidos en Registro",
                            body={}) 
                except ValueError as ve:
                    print(ve)
                # Ponemos el carro en estado de "No ha salido"
                vehiculo.state = False
                vehiculo.save()
                # Respuesta para un ticket de un no residente o un nuevo ticket residente   
                response= TemplateResponse(
                        status=status.HTTP_200_OK,
                        error=False,
                        message="New Ticket Register",
                        body=newticket)
                return Response(response.getResponse())
            else:
                # Este error es para debug ya que se ingreso mal algo en 
                # el formato del json
                response= TemplateResponse(
                    status=status.HTTP_400_BAD_REQUEST,
                    error=True,
                    message="Formatos Invalidos",
                    body={})
                return Response(response.getResponse())
        
        # El flujo no se interrumpio por un error ni por un ticket asi que 
        # lets debug jaja
        #response= TemplateResponse(
        #        status=status.HTTP_400_BAD_REQUEST,
        #        error=True,
        #        message="Error en el flujo de la consulta",
        #        body={})
        #return Response(response.getResponse())

    def list(self,request):
        ticket_set = models_ticket.Ticket.objects.filter(is_active = True)
        serializer = self.serializer_class(ticket_set, many=True)

        caja = models_caja.AccountBox.objects.all().filter(is_active=True).last()

        if caja is not None:
            # Liberar los tickets 
            for ticket in ticket_set:
                # Agregamos el detalle a caja
                registrocaja = models_caja.DetailBox(accountbox=caja,ticket=ticket)
                registrocaja.save()
                # Quitamos la activacion del ticket
                ticket.is_active = False
                # Actualizamos el estado de la caja
                caja.active = float(caja.activo) + float(ticket.total)
                caja.save()
                # Guardar registro
                ticket.save()
            response= TemplateResponse(
                        status=status.HTTP_200_OK,
                        error=False,
                        message="Pago del mes completo",
                        body= serializer.data)  
            return Response(response.getResponse())
        else:
            response= TemplateResponse(
                        status=status.HTTP_200_OK,
                        error=True,
                        message="No hay caja disponible",
                        body= serializer.data)  
            return Response(response.getResponse())

class TicketResidenteViewSet(viewsets.ModelViewSet):
    
    queryset =  models_ticket.Ticket.objects.all().filter(is_active=True)
    serializer_class = serializer_ticket.TicketResidenteSerializer     
    
    

class SeeBussy(viewsets.ModelViewSet):
    queryset =  models_ticket.Registro.objects.all()
    serializer_class = serializer_ticket.RegistroDisplaySerializer

    def create(self, request, *args, **kwargs):
        badge_ticket = request.data["id"]
        if(badge_ticket):
            if(badge_ticket.isnumeric()):
                data = models_ticket.Registro.objects.all().filter(is_active=True,ticket=int(badge_ticket))
                serializer = self.serializer_class(data, many=True)
                response= TemplateResponse(
                            status=status.HTTP_200_OK,
                            error=False,
                            message="Success",
                            body= serializer.data) 
            else:
                vehicle = v_models.Vehicle.objects.all().filter(badgenumber=badge_ticket).first()
                id_vehicle = vehicle.id
                data = models_ticket.Registro.objects.all().filter(is_active=True,ticket__vehicle=id_vehicle)
                serializer = self.serializer_class(data, many=True)
                response= TemplateResponse(
                            status=status.HTTP_200_OK,
                            error=False,
                            message="Success",
                            body= serializer.data) 
        else:
            data = models_ticket.Registro.objects.all().filter(is_active=True)
            serializer = self.serializer_class(data, many=True)
            response= TemplateResponse(
                        status=status.HTTP_200_OK,
                        error=False,
                        message="Success",
                        body= serializer.data)  

        return Response(response.getResponse())

class ListRegisterBussy(viewsets.ModelViewSet):
    queryset =  models_ticket.Registro.objects.all()
    serializer_class = serializer_ticket.RegistroDisplaySerializer

    def create(self, request, *args, **kwargs):
        """ Con este metodo Libero un registro de la lista de ocupados
            recibo en el request el id del ticket y busco el registro
            que este ocupado 
        """
        # Obtener Registro 
        ideregister = int(request.data["id_register"]) 
        data_register = models_ticket.Registro.objects.all().filter(id=ideregister,is_active=True).first()
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
            caja.activo = float(caja.activo) + float(pay)
            caja.save()

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

        # Liberar Vehiculo
        vehiculo.state = True
        vehiculo.save()

        serializer = self.serializer_class([data_register], many=True)
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
        




