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

const addVehiculo = () => {

  // Values 
  const [form,setForm] = useState({
    badgenumber:'',
    modelo:'',
    brand:'',
    typevehicle:'',
    typepropietary:'',
    description:'',
  })

  const [dataComboBox, setDataComboBox] =  useState({})

  const EntryRegister =async (e) =>{
    const url = "api/vehicles/vehicle/"
    const data = new FetchData()
    const datos = await data.request(url,"POST",form)
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
        modelos: await  data.request( "api/vehicles/modelo/","GET"),
        marcas: await  data.request( "api/vehicles/brand/","GET"),
        tipos: await  data.request( "api/vehicles/typevehicle/","GET"),
        propietarios: await  data.request( "api/vehicles/typepropietary/","GET"),
      })
      return response
    }
    getResponse()
    .then(response => setDataComboBox(response))
    
  }, []);

  return(
  <>
    <h2>Ingresar Vehiculo</h2>
    <div className='containeroption__form'>
      {
      Object.keys(dataComboBox).length>0 ?
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Placa</Label>
            <Input name="badgenumber" onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Modelo</Label>
            <select className="form-select" name="modelo" onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["modelos"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Marca</Label>
            <select className="form-select" name="brand" onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["marcas"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Tipo</Label>
            <select className="form-select" name="typevehicle" onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["tipos"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Propietarios</Label>
            <select className="form-select" name="typepropietary" onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["propietarios"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
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
export default addVehiculo;