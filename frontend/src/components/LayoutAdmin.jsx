import React from 'react';
import Usuarios from './modulesadmin/Usuarios';
import Roles from './modulesadmin/Roles';
import Caja from './modulesadmin/Caja';
import Parqueos from './modulesadmin/Parqueos';
import Contactos from './modulesadmin/Contactos';
import Conductores from './modulesadmin/Conductores';
import Vehiculo from './modulesadmin/Vehiculo';
import Reporte from './modulesadmin/Reporte';
import Nivel from './modulesadmin/Nivel';
import Sector from './modulesadmin/Sector';
import Posicion from "./modulesadmin/Posicion"
import InvalidOperation from './modulesadmin/InvalidOperation';

import { Switch, Route } from 'react-router-dom';
import "../assets/styles/components/GlobalAction.scss"
const LayoutAdmin = () => (
  <div className="LayoutAdmin">
    <Switch>
        <Route path="/admin/usuarios" component={Usuarios} />
        <Route path="/admin/roles" component={Roles} />
        <Route path="/admin/caja" component={Caja} />
        <Route path="/admin/estacion" component={Parqueos} />
        <Route path="/admin/contactos" component={Contactos} />
        <Route path="/admin/conductores" component={Conductores} />
        <Route path="/admin/vehiculos" component={Vehiculo} />
        <Route path="/admin/reportes" component={Reporte} />
        <Route path="/admin/niveles" component={Nivel} />
        <Route path="/admin/sectores" component={Sector} />
        <Route path="/admin/posiciones" component={Posicion} />
        <Route component={InvalidOperation} />
    </Switch>
  </div>
);

export default LayoutAdmin;