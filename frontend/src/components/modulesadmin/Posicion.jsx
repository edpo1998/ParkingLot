import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import addPosicion from './moduleaction/Posicion/addPosicion'
import listPosicion from './moduleaction/Posicion/listPosicion'
import updatePosicion from './moduleaction/Posicion/updatePosicion';
const Posicion = () => (
  <div className='containeroption'>
    <Switch>
      <Route 
          exact path="/admin/posiciones/add" 
          component={addPosicion} />
      <Route 
          exact path="/admin/posiciones/update" 
          component={updatePosicion} />
      <Route 
          exact path="/admin/posiciones/list" 
          component={listPosicion} />
      <Route 
          render={(props) => <DefaultAction {...props} name={"⤴️ Posicion"} />} />
    </Switch>
  </div>
);

export default Posicion;