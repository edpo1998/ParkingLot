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

const UpdateVehiculo = ({handleMessage}) => {

  const [dataComboBox, setDataComboBox] =  useState({})

  const [search,setSearch] = useState({
    id:'',
  })


  // Values 
  const [form,setForm] = useState({
    badgenumber:'',
    modelo:'',
    brand:'',
    typevehicle:'',
    typepropietary:'',
    description:'',
  })

  

  const EntryRegister =async (e) =>{
    try {
      const url = "api/vehicles/vehicle/"+form.id+"/"
      const data = new FetchData()
      await data.request(url,"PUT",form)
      handleMessage({
        header:'🟢 Estado del registro',
        message:'Vehiculo actualizado con exito',
        state:true
      })
    } catch (error) {
      handleMessage({
        header:'🔴 Estado del registro',
        message:`Error al actualizar el registro`,
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


  const handleChangeCbx = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
  }


  const handleSearch = (e) => {
    setSearch({
        ...search,
        [e.target.name]: e.target.value,
      });
    }

    const sendData = () => {
      const getResponse = async () => {
          const url = "api/vehicles/vehicle/"+search.id+"/"
          const data = new FetchData()
          const datos = await data.request(url,"GET")
          return datos
      }
        getResponse()
        .then(datos => setForm(datos))
      
  }
  
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
    <h2>Actualizar Vehiculo</h2>
    <div className='containeroption__form'>
      <div className="input-group" style={{justifyContent:"right"}}>
          <div className="form-outline">
              <input name="id" onChange={handleSearch} className="form-control" />
          </div>
          <button type="button" className="btn btn-primary" onClick={sendData}>🔎</button>
      </div>
      {
      Object.keys(dataComboBox).length>0 ?
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Placa</Label>
            <Input name="badgenumber" value={form.badgenumber} onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Modelo</Label>
            <select className="form-select" value={form.modelo}  name="modelo" onChange={handleChangeCbx} >
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
            <select className="form-select" name="brand" value={form.brand}  onChange={handleChangeCbx} >
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
            <select className="form-select" name="typevehicle" value={form.typevehicle}  onChange={handleChangeCbx} >
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
            <select className="form-select" name="typepropietary" value={form.typepropietary}  onChange={handleChangeCbx} >
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
              value={form.description} 
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
export default UpdateVehiculo;