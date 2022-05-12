import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  } from 'reactstrap'
import FetchData from '../api/Api';

const AddUsuario = ({handleMessage}) => {

  // Values 
  const [form,setForm] = useState({
    email:'',
    name:'',
    surname:'',
    username:'',
    rol:'',
    password:''
  })
  const [dataComboBox, setDataComboBox] =  useState({})

  const EntryRegister =async (e) =>{
    try{
      const url = "api/team/users/"
      const data = new FetchData()
      await data.request(url,"POST",form)
      handleMessage({
        header:'🟢 Estado del registro',
        message:'Usuario registrado con exito',
        state:true
      })
    }catch(e){
      handleMessage({
        header:'🔴 Estado del registro',
        message:'Verifica los campos del registro',
        state:true
      });
    }
  }

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
         });
  }


  const handleChangeCbx = (e) => form[e.target.name]= e.target.value

  useEffect( () => {
    const getResponse = async () => {
    const data = new FetchData()
      const response =  ({
        roles: await await data.request( "api/team/roles/","GET"),
      })
      return response
    }
    getResponse()
    .then(response => setDataComboBox(response))
    
  }, []);

  return(
  <>
    <h2>Ingresar Usuario</h2>
    <div className='containeroption__form'>
      {
      Object.keys(dataComboBox).length>0 ?
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Username</Label>
            <Input name="username" onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Nombre</Label>
            <Input name="name" onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Apellido</Label>
            <Input name="surname" onChange={handleChange}></Input> 
          </FormGroup>

          <FormGroup>
            <Label>Rol</Label>
            <select className="form-select" name="rol" onChange={handleChangeCbx}>
              <option value="">Seleccione el rol </option>
              {
                dataComboBox["roles"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.name}</option>)
              }
            </select> 
          </FormGroup>
          <FormGroup>
            <Label>Contrasenia</Label>
            <Input type="password" name="password" onChange={handleChange}></Input> 
          </FormGroup>

          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
        </Form>:
      <h1>Loading...</h1>
      }
    </div>
  </>

);
}
export default AddUsuario;