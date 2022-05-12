import {
    Table,
    Button
} from 'reactstrap'
import { useEffect,useState } from 'react';
import FetchData from '../api/Api';
  
  const ListEstacion = ({handleMessage}) => {
    const [data,setData] = useState([])

    useEffect(  () => {
        const getResponse = async () => {
            const url = "api/parqueo/estacion/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            setData(datos)
          }
          getResponse()
        
      },[]);
   
    const deleteRegister = (e) =>{
      const requestDelete = async () => {
        const url = "api/parqueo/estacion/"+e.target.value+"/"
        const data = new FetchData()
        const datos = await data.requestmessage(url,"DELETE")
        console.log(datos)
        return datos
      }
      requestDelete()
      .then(datos=> handleMessage({
        header:'🟢 Estado del registro',
        message:`Estacion eliminada con exito`,
        state:true
      }))
      .catch(error=> handleMessage({
        header:'🔴 Estado del registro',
        message:`${error}`,
        state:true
      }))
        
    }

    return(
    <>
     {
      data.length>0?
      <div className='containeroption__form'>
        <div className='table-wrapper-scroll-y my-custom-scrollbar'>
        <Table borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>Eliminar</th>
                <th>Estacion</th>
                <th>Estado</th>
                <th>Descripcion</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(registro =>(
                    <tr key={registro.id}>
                        <th scope="row" >{registro.id}</th>
                        <td><Button value={registro.id} className="btn-ls bg-danger" onClick={deleteRegister}>Delete</Button></td>
                        <td>{registro.identificador}</td>
                        <td >{registro.state?"🔴":"🟢"}</td>
                        <td >{registro.description}</td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
        </div>
      </div>:
      <h1>..Loading</h1>
    }  
    </>
  );
  }
  export default ListEstacion;