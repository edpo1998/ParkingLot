// React
import React,{useState,useEffect} from 'react';
// Componentes
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  Label,
  Input,
  FormGroup
} from 'reactstrap'
// Estilos
import "./styles/MRSalida.scss"
//Api
import api_parqueo from "../../../services/api.register.js"

const MRSalida = ({stateopen,handlechangeModal}) => {
    // Datos para la tabla
    const [data,setData] = useState({})

    // Barra de Busqueda
    const [search, setSearch] = useState("")

    useEffect(() => {
      
      const getResponse = async () => {
        const response = await api_parqueo.estacion.getRegisterBussy({id:search.toString()})
        return response
      }
      
    let timer = setTimeout(() => {
        getResponse()
        .then(response => setData(response))
        .catch(data => console.log(data))  
    }, 500);
  
    return () => clearTimeout(timer)
    });
    

    const handleChangeSearch = (e) => {
      setSearch(e.target.value)
    }
    const EntryRegister =async (e) =>{
        const postRequest = async () => {
          const response = await api_parqueo.estacion.registrarSalida({id_register:e.target.value})
          return response
        }
    
        postRequest()
        .then(response => {
          localStorage.setItem("ticket",JSON.stringify(response))
        })
        .catch(data => localStorage.setItem("err",JSON.stringify(data)))
    }

  return(
  <>{
    Object.keys(data).length >0 ?
    <Modal isOpen={stateopen} className="ModalStyleSalida" size="lg">
      <ModalHeader>
      🆓 Registrar Salida
      </ModalHeader> 
     
      <ModalBody className='FormModal'>
        
        <FormGroup>
          <Label>Busqueda</Label>
          <Input
             name="search" 
             value={search}  
             onChange={handleChangeSearch}
          />
        </FormGroup>
        

        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
            <table className="table table-bordered table-striped mb-0">
                <thead>
                    <tr>
                        <th scope="col" >Ticket</th>
                        <th scope="col" >Tipo</th>
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
                                <td >{registro.tipo=="Residente"?"⭐️":"👤"}</td>
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
      <ModalFooter><Button className="btn-lg bg-primary btnclose" onClick={()=>handlechangeModal("bussy",false)}>⬅️</Button></ModalFooter>
    </Modal>:
    <h1>Loading...</h1>
  } 
  </>

);
}
export default MRSalida;