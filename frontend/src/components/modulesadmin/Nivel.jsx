import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import listLevel from './moduleaction/Nivel/listNivel';
import addNivel from './moduleaction/Nivel/addNivel';
import updateNivel from './moduleaction/Nivel/updateNivel';
const Nivel = () => (
  <div className='containeroption'>
    <Switch>
        <Route exact path="/admin/niveles/add" component={addNivel} />
        <Route exact path="/admin/niveles/update" component={updateNivel} />
        <Route exact path="/admin/niveles/list" component={listLevel} />
        <Route render={(props) => <DefaultAction {...props} name={"🔺 Nivel"} />} />
    </Switch>
  </div>
);

export default Nivel;