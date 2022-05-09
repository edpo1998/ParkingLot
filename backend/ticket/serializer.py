# Django
from datetime import datetime, timezone

# Django RestFramework
from rest_framework import serializers


# Apps
from ticket import models as ticket_models
from estacion import serializer as estacion_serializers
from vehicle import models as vehicle_models
class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ticket_models.Ticket
        fields = '__all__'


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ticket_models.Registro
        fields = '__all__'




class RegistroDisplaySerializer(serializers.ModelSerializer):    
    class Meta:
        model = ticket_models.Registro
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['estacion']  = estacion_serializers.EstacionSerializer(instance.estacion).data['identificador']
        id_vehiculo =  TicketSerializer(instance.ticket).data['vehicle']
        response['id_vehiculo'] = id_vehiculo
        vehiculo = vehicle_models.Vehicle.objects.all().filter(id=id_vehiculo).first()
        response['vehiculo'] = str(vehiculo)
        
        
        return response


class DetailTicketSerializer(serializers.ModelSerializer):    
    class Meta:
        model = ticket_models.Registro
        fields = '__all__'

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['estacion']  = estacion_serializers.EstacionSerializer(instance.estacion).data['identificador']
        id_vehiculo =  TicketSerializer(instance.ticket).data['vehicle']
        response['id_vehiculo'] = id_vehiculo
        vehiculo = vehicle_models.Vehicle.objects.all().filter(id=id_vehiculo).first()
        response['vehiculo'] = str(vehiculo)
        response['mes_activo'] = instance.ticket.is_active
        # Tiempo Estimado
        if(instance.date_exit):
            minutes = (instance.date_exit-instance.date_entry).total_seconds()/60
            response['tiempo'] = minutes
            response['precio'] = round(float(minutes) * float(instance.ticket.vehicle.typepropietary.fee), 1)

        return response