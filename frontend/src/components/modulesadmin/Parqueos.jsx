import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import listEstacion from './moduleaction/Estacion/listEstacion';
import addEstacion from './moduleaction/Estacion/addEstacion';
import updateEstacion from './moduleaction/Estacion/updateEstacion';
const Parqueos = () => {
  return(
  <div className='containeroption'>
    <Switch>
        <Route exact path="/admin/estacion/add" component={addEstacion} />
        <Route exact path="/admin/estacion/update" component={updateEstacion} />
        <Route exact path="/admin/estacion/list" component={listEstacion} />
        <Route render={(props) => <DefaultAction {...props} name={"🛃 Parqueos"} />} />
    </Switch>
  </div>
);
}

export default Parqueos;