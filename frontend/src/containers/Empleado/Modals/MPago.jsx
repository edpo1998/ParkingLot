// React
import React,{useState,useEffect} from 'react';
// Componentes
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
} from 'reactstrap'
// Estilos
import "./styles/MRSalida.scss"
// Api
import api_parqueo from "../../../services/api.register.js"



const MPago = ({stateopen,handlechangeModal}) => {
    // Arreglo de tickets residentes
    const [data,setData] = useState([])

    // Mensaje de la respuesta del pago
    const [message,setMessage] = useState({})

    // Al iniciar se cargan los campos 
    useEffect( () => {
        const getResponse = async () => {
          const response = await api_parqueo.estacion.getResidentes()
          return response
        }
        getResponse()
        .then(response => setData(response))
        .catch(data => console.log(data))
      },[]);
      
    // Cerrar el modal
    const EntryRegister =() => {
      const getResponse = async () => {
        const response = await api_parqueo.estacion.pagarResidentes()
        return response
      }
      getResponse()
      .then(response => {
        setMessage({
          error: response.error,
          message: response.message
        })
      })
      .catch(data => console.log(data))
    }

  return(
  <>
      
    <Modal isOpen={stateopen} className="ModalStyleReporte" size="lg" style={{maxWidth: '1000px', width: '100%'}}>
      <ModalHeader>
        Realizar Pago
      </ModalHeader> 
      
      <ModalBody className='FormModal'>
      {
          Object.keys(message).length>0?
          <p className={message.error?"alert mt-2 alert-danger":"alert mt-2 alert-success"}>{message.message}</p>:
          ""
      }
        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <table className="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col" >No. Ticket</th>
                        <th scope="col">No. Placa</th>
                        <th scope="col">Conductor</th>
                        <th scope="col">Dpi</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(registro =>
                          <tr key={registro.id}>
                              <th scope="row" >{registro.id}</th>
                              <td>{registro.vehiculo}</td>
                              <td>{registro.namedriver}</td>
                              <td>{registro.dpi}</td>
                              <td >{registro.total}</td>
                          </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button className="btn-ls bg-dark btncustom" onClick={EntryRegister}> Pagar</Button>
        <Button className="btn-lg bg-primary btnclose" onClick={()=>handlechangeModal("pays",false)}>⬅️</Button>
      </ModalFooter>
    </Modal> 
  </>

);
}
export default MPago;