import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import listVehiculo from './moduleaction/Vehiculo/listVehiculo';
import addVehiculo from './moduleaction/Vehiculo/addVehiculo';
import updateVehiculo from './moduleaction/Vehiculo/updateVehiculo';
const Vehiculo = () => (
  <div className='containeroption'>
    <Switch>
        <Route exact path="/admin/vehiculos/add" component={addVehiculo} />
        <Route exact path="/admin/vehiculos/update" component={updateVehiculo} />
        <Route exact path="/admin/vehiculos/list" component={listVehiculo} />
        <Route render={(props) => <DefaultAction {...props} name={"🚗 Vehiculos"} />} />
    </Switch>
  </div>
);

export default Vehiculo;