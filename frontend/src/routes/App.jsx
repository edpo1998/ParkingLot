import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Login from '../containers/Login';
import NotFound from '../containers/NotFound';
import Dashboard from '../containers/Empleado/Dashboard';
import ManageDashBoard from '../containers/Administrador/ManageDashBoard';
import Unauthorized from '../containers/Unauthorized';

function session(){
  const isLogin = sessionStorage.getItem("session")? JSON.parse(sessionStorage['session']): undefined;

  if(isLogin){
    if(isLogin.role=="admin"){
      return <Route path="/admin" component={ManageDashBoard} />
    }else{
      return (
          <Route exact path="/empleado" component={Dashboard} />
      )
    }
  }

}
const App = () => {
  const isLogin = sessionStorage.getItem("session")? JSON.parse(sessionStorage['session']): undefined;
  return(
  <BrowserRouter>
    <Layout>
      <Switch>
        {isLogin?'':<Route exact path="/" component={Login} />}
        {session(isLogin) }
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </BrowserRouter>
);
}
export default App;