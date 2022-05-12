import React ,{useState}from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import ListVehiculo from './moduleaction/Vehiculo/listVehiculo';
import AddVehiculo from './moduleaction/Vehiculo/addVehiculo';
import UpdateVehiculo from './moduleaction/Vehiculo/updateVehiculo';
import Message from '../Message';

const Vehiculo = () => {
  const [statemessage ,setStatatemessage] = useState({
    header:'',
    message:'',
    state:false
  })
  
  const handleMessage = (obj) => {
    setStatatemessage(obj)
  }

  return(
  <div className='containeroption'>
    <Message statemessage={statemessage} handleMessage={handleMessage}/>
    <Switch>
        <Route 
            exact path="/admin/vehiculos/add" 
            component={()=><AddVehiculo handleMessage={handleMessage} />} 
             />
        <Route 
            exact path="/admin/vehiculos/update" 
            component={()=><UpdateVehiculo handleMessage={handleMessage} />}/>
        <Route 
            exact path="/admin/vehiculos/list" 
            component={()=><ListVehiculo handleMessage={handleMessage} />}/>
        <Route 
            render={(props) => <DefaultAction {...props} name={"🚗 Vehiculos"} />} />
    </Switch>
  </div>
);
}

export default Vehiculo;