import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
  } from 'reactstrap'
import data_vehicle from "../../../services/api.vehicle.js"

const MRvehiculo = ({stateopen,handlechangeModal}) => {

  // Values 
  const [form,setForm] = useState({
    badgenumber:'',
    modelo:'',
    brand:'',
    typevehicle:'',
    typepropietary:'',
    description:''
  })
  const [dataComboBox, setDataComboBox] =  useState({})

  const EntryRegister =async (e) =>{
    const response = await data_vehicle.vehicle.insert(form)
    handlechangeModal("vehiculo",false)
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
      const response =  ({
        modelos: await data_vehicle.modelos.getdata(),
        marcas: await data_vehicle.marcas.getdata(),
        tipos: await data_vehicle.tiposvehiculo.getdata(),
        conductores: await data_vehicle.tipoconductor.getdata()
      })
      return response
    }
    getResponse()
    .then(response => setDataComboBox(response))
  }, []);

  return(
  <>
    <Modal isOpen={stateopen} className="ModalStyle">
      <ModalHeader>
        Registrar Vehiculo
      </ModalHeader> 
      {
      Object.keys(dataComboBox).length>0 ?
      <ModalBody className='FormModal'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Placa</Label>
            <Input name="badgenumber"  onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Marca</Label>
            <select className="form-select" name="brand" onChange={handleChangeCbx} >
              <option value="">Seleccione la marca</option>
              {
                dataComboBox["marcas"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.name}</option>
                )
              }
            </select>
          </FormGroup>
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
          <FormGroup>
            <Label>Tipo Vehiculo</Label>
            <select className="form-select" name="typevehicle" onChange={handleChangeCbx}>
              <option value="">Seleccione el tipo de vehiculo</option>
              {
                dataComboBox["tipos"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.name}</option>)
              }
            </select> 
          </FormGroup>
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
        </Form>
      </ModalBody>:
      <h1>Loading...</h1>
      }
    </Modal> 
  </>

);
}
export default MRvehiculo;