import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import addSector from './moduleaction/Sector/addSector';
import listSector from './moduleaction/Sector/listSector';
import updateSector from './moduleaction/Sector/updateSector';

const Sector = () => (
  <div className='containeroption'>

    <Switch>
        <Route 
            exact path="/admin/sectores/add" 
            component={addSector} 
            />
        <Route 
            exact path="/admin/sectores/update" 
            component={updateSector} />
        <Route 
            exact path="/admin/sectores/list" 
            component={listSector} />
        <Route 
            render={(props) => <DefaultAction {...props} 
            name={"🔳 Sector"} />} />
    </Switch>
    
  </div>
);

export default Sector;