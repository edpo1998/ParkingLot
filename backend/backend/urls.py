
from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from api.views import UserAuthToken
from estacion.views import EstacionFreeView
urlpatterns = [

    path('admin/', admin.site.urls),
    path('api/team/', include('api.urls')),
    path('api/vehicles/', include('vehicle.urls')),
    path('api/agenda/', include('contact.urls')),
    path('api/propietarios/', include('conductor.urls')),
    path('api/parqueo/', include('estacion.urls')),
    path('api/registros/', include('ticket.urls')),
    path('api/caja/', include('caja.urls')),
    path('auth/',UserAuthToken.as_view()),

]
