import {
    Table,
    Button
} from 'reactstrap'
import { useEffect,useState } from 'react';
import FetchData from '../api/Api';
  
  const listVehiculo = () => {
    const [data,setData] = useState([])

    useEffect(  () => {
        const getResponse = async () => {
            const url = "api/vehicles/vehicle/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            setData(datos)
          }
          getResponse()
        
      },[]);
   
    const deleteRegister = (e) =>{
        const requestDelete = async () => {
            const url = "api/vehicles/vehicle/"+e.target.value+"/"
            const data = new FetchData()
            const datos = await data.request(url,"DELETE")
            //setData(datos)
          }
          requestDelete()
    }

    return(
    <>
     {
      data.length>0?
      <div className='containeroption__form'>
        <Table >
            <thead>
            <tr>
                <th>#</th>
                <th>Estado</th>
                <th>Numero de placa</th>
                <th>modelo</th>
                <th>marca</th>
                <th>Tipo</th>
                <th>Propietario</th>
                <th>Description</th>
                <th>Eliminar</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(registro =>(
                    <tr key={registro.id}>
                        <th scope="row" >{registro.id}</th>
                        <td >{registro.is_active?'🟢':'🔴'}</td>
                        <td>{registro.badgenumber}</td>
                        <td >{registro.modelo}</td>
                        <td >{registro.brand}</td>
                        <td >{registro.typevehicle}</td>
                        <td >{registro.typepropietary}</td>
                        <td >{registro.description}</td>
                        <td><Button value={registro.id} className="btn-ls bg-danger" onClick={deleteRegister}>Dar de Baja</Button></td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
      </div>:
      <h1>..Loading</h1>
    }  
    </>
  );
  }
  export default listVehiculo;