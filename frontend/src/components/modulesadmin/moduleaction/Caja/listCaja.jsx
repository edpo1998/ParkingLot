import {
    Table,
    Button
    } from 'reactstrap'
  import { useEffect,useState } from 'react';
  import FetchData from '../api/Api';
  
  const listCaja = () => {
    const [data,setData] = useState([])

    useEffect(  () => {
        const getResponse = async () => {
            const url = "api/caja/caja/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            setData(datos)
          }
          getResponse()
        
      },[]);
   
    const closeRegister = (e) =>{
        const requestDelete = async () => {
            const url = "api/caja/caja/"+e.target.value+"/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            datos.is_active = false;
            const closedata = await data.request(url,"PUT",datos)
          }
          requestDelete()
    }

    return(
    <>
     {
      data.length>0?
      <div className='containeroption__form'>
        <Table borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>Apertura</th>
                <th>Cierre</th>
                <th>Cuenta</th>
                <th>Estado</th>
                <th>Cerrar</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(registro =>(
                    <tr key={registro.id}>
                        <th scope="row" >{registro.id}</th>
                        <td>{registro.date_open}</td>
                        <td >{registro.date_close}</td>
                        <td >{registro.activo}</td>
                        <td >{registro.is_active?"En Apertura":"Caja Cerrada"}</td>
                        <td>{registro.is_active?<Button value={registro.id} className="btn-ls bg-danger" onClick={closeRegister}>Close</Button>:"Reapertura No disponible"}</td>
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
  export default listCaja;