
import React from 'react';
import { Button } from 'reactstrap';
import Header from '../components/Header';
const Home = ({history}) => {
  const session_active = JSON.parse(sessionStorage['session']);
  
  const redirectDashboard = () =>{
      if(session_active.rol=="admin"){
        history.push("/admin")
      }else{
        history.push("/empleado")
      }
  }

  return(
  <>
  <Header></Header>
  <div className='containeroption'>
    <h1>🛃 Bienvenido {session_active.name} </h1>
    <Button onClick={redirectDashboard}>Ir al Dashboard</Button>
  </div>
  </>
);
}
export default Home;