import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import listCaja from './moduleaction/Caja/listCaja';
import abrirCaja from './moduleaction/Caja/abrirCaja';
const Caja = () => (
  <div className='containeroption'>
    <Switch>
        <Route exact path="/admin/caja/list" component={listCaja} />
        <Route exact path="/admin/caja/open" component={abrirCaja} />
        <Route render={(props) => <DefaultAction {...props} name={"caja"} />} />
    </Switch>
  </div>
);

export default Caja;