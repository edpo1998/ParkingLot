import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import addUsuario from './moduleaction/Usuarios/addUsuario';
import listUsuario from './moduleaction/Usuarios/listUsuario';
import updateUsuario from './moduleaction/Usuarios/updateUsuario';
const Usuarios = () => (
  <div className='containeroption'>
    <Switch>
        <Route exact path="/admin/usuarios/add" component={addUsuario} />
        <Route exact path="/admin/usuarios/update" component={updateUsuario} />
        <Route exact path="/admin/usuarios/list" component={listUsuario} />
        <Route render={(props) => <DefaultAction {...props} name={"👤 Usuarios"} />} />
    </Switch>
  </div>
);

export default Usuarios;