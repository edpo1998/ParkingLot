import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import addRol from './moduleaction/Roles/addRol';
import updateRol from './moduleaction/Roles/updateRol';
import listRol from './moduleaction/Roles/listRol';

const Roles = () => (
  <div className='containeroption'>
    <Switch>
        <Route 
            exact path="/admin/roles/add" 
            component={addRol} />
        <Route 
            exact path="/admin/roles/update" 
            component={updateRol} />
        <Route 
            exact path="/admin/roles/list" 
            component={listRol} />
        <Route 
            render={(props) => <DefaultAction {...props} name={"🛃 Roles"} />} />
    </Switch>
  </div>
);

export default Roles;