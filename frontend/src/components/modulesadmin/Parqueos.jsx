import React,{useState} from 'react';
import { Switch, Route } from 'react-router-dom';
import DefaultAction from '../DefaultAction';
import ListEstacion from './moduleaction/Estacion/listEstacion';
import AddEstacion from './moduleaction/Estacion/addEstacion';
import UpdateEstacion from './moduleaction/Estacion/updateEstacion';
import Message from '../Message';

const Parqueos = () => {
  const [statemessage ,setStatatemessage] = useState({
    header:'',
    message:'',
    state:false
  });
  
  const handleMessage = (obj) => {
    setStatatemessage(obj)
  }

  return(
  <div className='containeroption'>
    <Message statemessage={statemessage} handleMessage={handleMessage}/>
    <Switch>
        <Route 
            exact path="/admin/estacion/add" 
            component={()=><AddEstacion handleMessage={handleMessage} />} 
        />
        <Route 
            exact path="/admin/estacion/update" 
            component={()=><UpdateEstacion handleMessage={handleMessage} />} 
        />
        <Route 
            exact path="/admin/estacion/list" 
            component={()=><ListEstacion handleMessage={handleMessage} />} 
        />
        <Route 
            render={(props) => <DefaultAction {...props} name={"🛃 Parqueos"} />} />
    </Switch>
  </div>
);
}

export default Parqueos;