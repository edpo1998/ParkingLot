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
import data_vehicle from "../../../services/api.vehicle.js"


const MRvehiculo = ({stateopen,handlechangeModal}) => {

  // Valores del form
  const [form,setForm] = useState({
    badgenumber:'',
    modelo:'',
    brand:'',
    typevehicle:'',
    typepropietary:'',
    description:''
  })

  // Valores seleccionables
  const [dataComboBox, setDataComboBox] =  useState({})
  // Mensaje del estado de la respuesta
  const [message,setMessage] = useState({})

  // Funcion para el ingreso del Vehiculo
  const EntryRegister = async () =>{
  
    try {
      // Llamada a la api
      const response = await data_vehicle.vehicle.insert(form)
      
      // Validacion de la respuesta
      if(Object.keys(response).length>1){
        setMessage({
          error:false,
          message: "Registro Exitoso"
        })
        setForm({
          badgenumber:'',
          modelo:'',
          brand:'',
          typevehicle:'',
          typepropietary:'',
          description:''
        })
      }else{
        setMessage({
          error:true,
          message: "Verifique los campos"
        })
      }
    } catch (error) {
      setMessage({
        error:true,
        message: error
      })
    }
  }

  // Evento para actualizar los valores del form
  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
  }

  // Evento para seleccionar el combobox seleccionado
  const handleChangeCbx = (e) => form[e.target.name]= e.target.value


  // Unica renderizacion para extraer los datos del combobox
  useEffect( () => {

    // Funcion asincrona para extraer los combobox
    const getResponse = async () => {
      const response =  ({
        modelos: await data_vehicle.modelos.getdata(),
        marcas: await data_vehicle.marcas.getdata(),
        tipos: await data_vehicle.tiposvehiculo.getdata(),
        conductores: await data_vehicle.tipoconductor.getdata()
      })
      return response
    }

    // Llamada a la funcion
    getResponse()
    .then(response => setDataComboBox(response))
    .catch(response => console.log("Error"))

  }, []);

  return(
  <>
    <Modal isOpen={stateopen}  className="ModalStyle">
      {/** Encabezado del moda*/}
      <ModalHeader>
      🚗 Registrar Vehiculo
      </ModalHeader> 
      {/** Mensaje de Estado del registro */}
      {
          Object.keys(message).length>0?
          <p className={message.error?"alert mt-2 alert-danger":"alert mt-2 alert-success"}>{message.message}</p>:
          ""
      }
      {/** Cuerpo del Modal */}
      {
      Object.keys(dataComboBox).length>0 ?
      <ModalBody className='FormModal'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
           {/** Placa */}
          <FormGroup>
            <Label>Placa</Label>
            <Input name="badgenumber" value={form.badgenumber} onChange={handleChange}></Input> 
          </FormGroup>
           {/** Marca */}
          <FormGroup>
            <Label>Marca</Label>
            <select className="form-select" name="brand" onChange={handleChangeCbx} >
              <option value={""}>Seleccione la marca</option>
              {
                dataComboBox["marcas"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
              }
            </select>
          </FormGroup>
           {/** Modelo */}
          <FormGroup>
            <Label>Modelo</Label>
            <select className="form-select" name="modelo" onChange={handleChangeCbx}>
              <option value="">Seleccione el modelo</option>
              {
                dataComboBox["modelos"].map((modelo)=>
                  <option key={modelo.id} value={modelo.id}>{modelo.name}</option>
                )
              }
            </select>
          </FormGroup>
           {/** Tipo de vehiculo */}
          <FormGroup>
            <Label>Tipo Vehiculo</Label>
            <select className="form-select"  name="typevehicle" onChange={handleChangeCbx}>
              <option value="">Seleccione el tipo de vehiculo</option>
              {
                dataComboBox["tipos"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.name}</option>)
              }
            </select> 
          </FormGroup>
           {/** Tipo de conductor */}
          <FormGroup>
            <Label>Tipo Conductor</Label>
            <select className="form-select" name="typepropietary" onChange={handleChangeCbx}>
              <option value="">Seleccione el tipo de conductor</option>
              {
                dataComboBox["conductores"].map((conductor)=>
                  <option key={conductor.id} value={conductor.id}>{conductor.name}</option>)
              }
            </select>
          </FormGroup>
          {/** Descripcion */}
          <FormGroup>
            <Label>Descripcion</Label>
            <Input
              name="description"
              type="textarea"
              value={form.description}
              style={{resize:'none'}}
              maxLength={100}
              onChange={handleChange}
            />
          </FormGroup>  
          {/** Botones de accion*/}
          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
          <Button className="btn-lg bg-primary btnclose" onClick={()=>handlechangeModal("vehiculo",false)}>⬅️</Button>
        </Form>
      </ModalBody> 
          
      :
      <h1>Loading...</h1>
      }
    </Modal> 
  </>

);
}


export default MRvehiculo;
