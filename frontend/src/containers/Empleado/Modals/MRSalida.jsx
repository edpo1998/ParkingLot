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

const MRSalida = ({stateopen,handlechangeModal}) => {
    const [data,setData] = useState({})

    useEffect( () => {

        const getResponse = async () => {
          const response = await api_parqueo.estacion.getRegisterBussy()
          return response
        }
    
        getResponse()
        .then(response => setData(response))
        .catch(data => console.log(data))
    
        
      },[]);

    const EntryRegister =async (e) =>{
        const postRequest = async () => {
          const response = await api_parqueo.estacion.registrarSalida({id_register:e.target.value})
          return response
        }
    
        postRequest()
        .then(response => {
          console.log(response)
          handlechangeModal("bussy",false)
        })
        .catch(data => console.log(data))
    }

  return(
  <>{
    Object.keys(data).length >0 ?
    <Modal isOpen={stateopen} className="ModalStyleSalida">
      <ModalHeader>
        Registrar Salida
      </ModalHeader> 
     
      <ModalBody className='FormModal'>
        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <table className="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col" >Ticket</th>
                        <th scope="col">No. Placa</th>
                        <th scope="col">Parqueo Asignado</th>
                        <th scope="col">Datos de Ingreso</th>
                        <th scope="col">Registrar Salida</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.body.map(registro =>(
                            <tr key={registro.id}>
                                <th scope="row" >{registro.ticket}</th>
                                <td >{registro.vehiculo}</td>
                                <td>{registro.estacion}</td>
                                <td>{registro.date_entry}</td>
                                <td><Button value={registro.id} className="btn-ls bg-danger btncustom" onClick={EntryRegister}>Salida</Button></td>
                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
        </div>
      </ModalBody>
    </Modal>:
    <h1>Loading...</h1>
  } 
  </>

);
}
export default MRSalida;