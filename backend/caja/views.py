# Django

# Django RestFramework
from hashlib import new
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
# app
from caja import serializer as serializer_caja
from caja import models as models_caja
from ticket.template import TemplateResponse 


class AccountBoxViewSet(viewsets.ModelViewSet):
    queryset =  models_caja.AccountBox.objects.all()
    serializer_class = serializer_caja.AccountBoxSerializer

    def create(self, request, *args, **kwargs):
        caja = models_caja.AccountBox.objects.all().filter(is_active=True).last()
        if caja is None:
            body = request.data["activo"]
            if body is not None:
                monto =float(body)
                newbox = models_caja.AccountBox(activo=monto)
                newbox.save()
            else:
                newbox = models_caja.AccountBox()
                newbox.save()
            response= TemplateResponse(
                    status=status.HTTP_200_OK,
                    error=False,
                    message="Caja Aperturada con exito",
                    body= {})  
            return Response(response.getResponse())

        else:
            response= TemplateResponse(
                    status=status.HTTP_400_BAD_REQUEST,
                    error=True,
                    message="Ya hay una caja activa",
                    body= {})  
            return Response(response.getResponse())


class DetailBoxViewSet(viewsets.ModelViewSet):
    queryset =  models_caja.DetailBox.objects.all()
    serializer_class = serializer_caja.DetailBoxSerializer
