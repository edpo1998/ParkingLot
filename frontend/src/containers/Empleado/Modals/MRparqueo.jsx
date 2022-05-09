import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
  } from 'reactstrap'
  import api_parqueo from "../../../services/api.parqueo.js"

const MRparqueo = ({stateopen,handlechangeModal}) => {

  // Values 
  const [form,setForm] = useState({
    namedriver:'', // Input
    dpi:'', // Input
    vehicle:'', // Input
    empleado:''
  })
  
  const[estacion,setEstacion]= useState({})

  const EntryRegister =async (e) =>{
    const response = await api_parqueo.estacion.generateTicket({
      namedriver: form.namedriver,
      dpi: form.dpi,
      vehicle: form.vehicle,
      empleado: JSON.parse(sessionStorage['session']).id,
      estacion: estacion.id
    })
    handlechangeModal("parqueo",false)
  }

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
  }

  useEffect( () => {
    setForm({
      ...form,
      empleado: JSON.parse(sessionStorage['session']).name,
    });

    const getResponse = async () => {
      const response = await api_parqueo.estacion.getdata()
      return response
    }

    getResponse()
    .then(response => setEstacion(response[0]))
    .catch(response => console.log("Error"))

    
  }, []);
  return(
  <>
    <Modal isOpen={stateopen} className="ModalStyle">
      <ModalHeader>
        Registrar Parqueo
      </ModalHeader> 
      {
      Object.keys(estacion).length>0 ?
      <ModalBody className='FormModal'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
        {/* Nombre: */}
          <FormGroup>
            <Label>Nombre</Label>
            <Input name="namedriver"  onChange={handleChange}></Input> 
          </FormGroup>
        {/* Dpi: */}
          <FormGroup>
            <Label>Identificacion</Label>
            <Input name="dpi"  onChange={handleChange}></Input> 
          </FormGroup>
        {/* Vehiculo: */}
          <FormGroup>
            <Label>Vehiculo</Label>
            <Input name="vehicle"  onChange={handleChange}></Input> 
          </FormGroup>
        {/* Empleado: */}
        <FormGroup>
            <Label>Empleado</Label>
            <Input name="empleado" defaultValue={form.empleado} readOnly></Input> 
        </FormGroup>
        {/* Estacion: */}
        <FormGroup>
            <Label>Estacion</Label>
            <Input name="estacion"  defaultValue={estacion.identificador} readOnly></Input> 
        </FormGroup>
          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
        </Form>
      </ModalBody>:
      <h1>Loading...</h1>
      }
    </Modal> 
  </>

);
}
export default MRparqueo;