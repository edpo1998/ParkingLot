import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';
import Dashboard from '../containers/Empleado/Dashboard';
import ManageDashBoard from '../containers/Administrador/ManageDashBoard';
import { verifyRol,isLogged } from '../utils/auth.js';

const App = () => {
  return(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={isLogged(Login)} />
        <Route path="/admin" component={verifyRol(["admin"],ManageDashBoard)} />
        <Route path="/empleado" component={verifyRol(["admin","empleado"],Dashboard)} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
}
export default App;