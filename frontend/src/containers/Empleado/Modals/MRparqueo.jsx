// React
import React,{useState,useEffect} from 'react';
// Components
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal, ModalHeader, ModalBody, 
  Label,
  } from 'reactstrap'
// Api
import api_parqueo from "../../../services/api.parqueo.js"



const MRparqueo = ({stateopen,handlechangeModal}) => {
  // Campos del registro de un ticket 
  const [form,setForm] = useState({
    namedriver:'', 
    dpi:'', 
    vehicle:'',
    empleado:JSON.parse(sessionStorage['session']).name
  })

  // Campos de seleccion para el estacionamiento
  const[estacion,setEstacion]= useState({})

  // Mensaje del estado de la respuesta
  const [message,setMessage] = useState({})

  // Funcion para el ingreso del vehiculo
  const EntryRegister = async () =>{
    try{
      // Intentar ingresar la operacion
      const response = await api_parqueo.estacion.generateTicket({
        namedriver: form.namedriver,
        dpi: form.dpi,
        vehicle: form.vehicle,
        empleado: JSON.parse(sessionStorage['session']).id,
        estacion: estacion.id
      })
      // Ingresamos el ticket en el local storage para poder imprimir el ultimo generado
      if(response.error== false)
        localStorage.setItem("ticket",JSON.stringify(response.body))
      
      setMessage({
        error: response.error,
        message: response.message
      })

      // Limpiar los campos
      setForm({
        namedriver:'', 
        dpi:'', 
        vehicle:'',
        empleado:JSON.parse(sessionStorage['session']).name
      })
      // Nuevo registro
      generateData()
    }catch(e){
      setMessage({
        error: true,
        message: e
      })
    }
  }

  // Funcion para actualizar los campos del formulario
  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
  }

  const generateData = ()=>{


    // Funcion asincrona para realizar la peticion
    const getResponse = async () => {
      const response = await api_parqueo.estacion.getdata()
      return response
    }

    // Llamada para obtener los datos
    getResponse()
    .then(response => setEstacion(response[0]))
    .catch(response => console.log("Error"))
  }

  // Al iniciar el render establecer el parqueo a asignar
  useEffect( () => {
    generateData()
    
  }, []);


  return(
  <>
    <Modal isOpen={stateopen} className="ModalStyle">
      <ModalHeader>
        🅿️ Registrar Parqueo
      </ModalHeader> 
      {
          Object.keys(message).length>0?
          <p className={message.error?"alert mt-2 alert-danger":"alert mt-2 alert-success"}>{message.message}</p>:
          ""
      }

      {
      Object.keys(estacion).length>0 ?
      <ModalBody className='FormModal'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
        {/* Vehiculo: */}
        <FormGroup>
            <Label>Vehiculo</Label>
            <Input name="vehicle" value={form.vehicle} onChange={handleChange}></Input> 
          </FormGroup>
        {/* Nombre: */}
          <FormGroup>
            <Label>Nombre</Label>
            <Input name="namedriver" value={form.namedriver} onChange={handleChange}></Input> 
          </FormGroup>
        {/* Dpi: */}
          <FormGroup>
            <Label>Identificacion</Label>
            <Input name="dpi" value={form.dpi}  onChange={handleChange}></Input> 
          </FormGroup>
        {/* Empleado: */}
        <FormGroup>
            <Label>Empleado</Label>
            <Input name="empleado" value={form.empleado} readOnly></Input> 
        </FormGroup>
        {/* Estacion: */}
        <FormGroup>
            <Label>Estacion</Label>
            <Input name="estacion" value={estacion.identificador}  readOnly></Input> 
        </FormGroup>
          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
          <Button className="btn-lg bg-primary btnclose" onClick={()=>handlechangeModal("parqueo",false)}>⬅️</Button>
        </Form>
      </ModalBody>:
      <h1>Loading...</h1>
      }
    </Modal> 
  </>

);
}
export default MRparqueo;