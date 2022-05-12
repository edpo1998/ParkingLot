import React,{useState,useEffect} from 'react';
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap'
import "./styles/MRMes.scss"
import api_parqueo from "../../../services/api.register.js"

const MRMes = ({stateopen,handlechangeModal}) => {
    const [data,setData] = useState({})
    
    useEffect( () => {
        const getResponse = async () => {
          const response = await api_parqueo.estacion.getReporte()
          return response
        }
        getResponse()
        .then(response => setData(response.body))
        .catch(data => console.log(data))
      },[]);
 
    const EntryRegister =async (e) => handlechangeModal("mounth",false)

  return(
  <>{
    data.length>0?
    <Modal isOpen={stateopen} className="ModalStyleReporte " size="lg" style={{maxWidth: '1000px', width: '100%'}}>
      <ModalHeader>
      📜 Reporte de Salidas
      </ModalHeader> 
     
      <ModalBody className='FormModal' >
        <div className='table-wrapper-scroll-y my-custom-scrollbar '>
            <table className="table table-bordered table-striped mb-0 ">
                <thead>
                    <tr>
                        <th scope="col" >Ticket</th>
                        <th scope="col" >No. Placa</th>
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
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-ls bg-dark btncustom" onClick={EntryRegister}> Imprimir</Button>
        <Button className="btn-lg bg-primary btnclose" onClick={()=>handlechangeModal("mounth",false)}>⬅️</Button>
      </ModalFooter>
    </Modal> :
    <h1>Loading...</h1>
  } 
  </>

);
}
export default MRMes;