import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
  } from 'reactstrap'

import "./styles/MRSalida.scss"
import api_parqueo from "../../../services/api.register.js"

const MPago = ({stateopen,handlechangeModal}) => {
    const [data,setData] = useState({})
    const [form,setForm] = useState({
        valsearch:''
      })
      
    useEffect( () => {
        const getResponse = async () => {
          const response = await api_parqueo.estacion.getReporte()
          return response
        }
        getResponse()
        .then(response => setData(response.body))
        .catch(data => console.log(data))
      },[]);
    
      const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
      }
    const EntryRegister =async (e) => handlechangeModal("pays",false)

  return(
  <>{
    data.length>0?
    <Modal isOpen={stateopen} className="ModalStyleSalida">
      <ModalHeader>
        Realizar Pago
      </ModalHeader> 
     
      <ModalBody className='FormModal'>
        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <FormGroup>
                <Label>Buscar</Label>
                <Input name="valsearch" onChange={handleChange}></Input> 
            </FormGroup>
            <table className="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col" >Ticket</th>
                        <th scope="col">No. Placa</th>
                        <th scope="col">Parqueo Asignado</th>
                        <th scope="col">Datos de Ingreso</th>
                        <th scope="col">Datos de Egreso</th>
                        <th scope="col">Tiempo Estimado</th>
                        <th scope="col">Valor Aproximado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(registro =>{
                            if(registro.mes_activo==true){
                                return(<tr key={registro.id}>
                                    <th scope="row" >{registro.ticket}</th>
                                    <td>{registro.vehiculo}</td>
                                    <td>{registro.estacion}</td>
                                    <td >{registro.date_entry}</td>
                                    <td>{registro.date_exit}</td>
                                    <td>{registro.tiempo}</td>
                                    <td>{registro.precio}</td>
                                </tr>)
                            }
                        })
                    }
                </tbody>
            </table>
            <Label>Total: {data.map(e=>{return(e.precio?e.precio:0)}).reduce((p, c) => p + c)}</Label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-ls bg-dark btncustom" onClick={EntryRegister}> Pagar</Button>
      </ModalFooter>
    </Modal> :
    <h1>Loading...</h1>
  } 
  </>

);
}
export default MPago;