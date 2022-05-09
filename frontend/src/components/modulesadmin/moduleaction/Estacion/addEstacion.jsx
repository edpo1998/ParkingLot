import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
  } from 'reactstrap'
import FetchData from '../api/Api';

const addEstacion = () => {

  // Values 
  const [form,setForm] = useState({
    number:'',
    state:false,
    description:'',
    level:'',
    sector:'',
    position:''
  })
  const [dataComboBox, setDataComboBox] =  useState({})

  const EntryRegister =async (e) =>{
    const url = "api/parqueo/estacion/"
    const data = new FetchData()
    const datos = await data.request(url,"POST",form)
  }

  const handleChange = (e) => {
    
    if(e.target.name == "state"){
        setForm({
            ...form,
            [e.target.name]: !form.state,
          });
    }else{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
    }
  }


  const handleChangeCbx = (e) => form[e.target.name]= e.target.value

  useEffect( () => {
    const getResponse = async () => {
    const data = new FetchData()
      const response =  ({
        levels: await await data.request( "api/parqueo/level/","GET"),
        sectores: await await data.request( "api/parqueo/sector/","GET"),
        posiciones: await await data.request( "api/parqueo/position/","GET"),
      })
      return response
    }
    getResponse()
    .then(response => setDataComboBox(response))
    
  }, []);

  return(
  <>
    <h2>Ingresar Estacion al parqueo</h2>
    <div className='containeroption__form'>
      {
      Object.keys(dataComboBox).length>0 ?
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Numero</Label>
            <Input name="number" onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup check>
            <Label check>
                <Input name="state" type="checkbox" value={form.state} onChange={handleChange} />{' '}
                Estado
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>Nivel</Label>
            <select className="form-select" name="level" onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["levels"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.level}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Sector</Label>
            <select className="form-select" name="sector" onChange={handleChangeCbx}>
              <option value="">Seleccione el sector</option>
              {
                dataComboBox["sectores"].map((registro)=>
                  <option key={registro.id} value={registro.id}>{registro.name}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Posicion</Label>
            <select className="form-select" name="position" onChange={handleChangeCbx}>
              <option value="">Seleccione la posicion </option>
              {
                dataComboBox["posiciones"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.level}</option>)
              }
            </select> 
          </FormGroup>
          <FormGroup>
            <Label>Descripcion</Label>
            <Input
              name="description"
              type="textarea"
              style={{resize:'none'}}
              maxLength={100}
              onChange={handleChange}
            />
          </FormGroup>  
          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
        </Form>:
      <h1>Loading...</h1>
      }
    </div>
  </>

);
}
export default addEstacion;