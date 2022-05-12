import {
    Table,
    Button
    } from 'reactstrap'
  import { useEffect,useState } from 'react';
  import FetchData from '../api/Api';
  
  const ListUsuario = ({handleMessage}) => {
    const [data,setData] = useState([])

    useEffect(() => {
        const getResponse = async () => {
          const url = "api/team/users/"
          const data = new FetchData()
          const datos = await data.request(url,"GET")
          return datos
        }
        getResponse()
        .then(datos=> setData(datos))
        .catch(error=>setData([]))
      },[]);
   
    const deleteRegister = (e) =>{
        const requestDelete = async () => {
            const url = "api/team/users/"+e.target.value+"/"
            const data = new FetchData()
            const datos = await data.requestmessage(url,"DELETE")
            return datos
          }
          requestDelete()
          .then(datos=> handleMessage({
            header:'🟢 Estado del registro',
            message:`Usuario eliminado con exito`,
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
        <Table borderless>
            <thead>
            <tr>
                <th>#</th>
                <th>Email</th>
                <th>Usuario</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Contrasenia</th>
                <th>Rol</th>
            </tr>
            </thead>
            <tbody>
            {
                data.map(registro =>(
                    <tr key={registro.id}>
                        <th scope="row" >{registro.id}</th>
                        <td>{registro.email}</td>
                        <td>{registro.username}</td>
                        <td>{registro.name}</td>
                        <td >{registro.surname}</td>
                        <td >Falta Implementar endpoint</td>
                        <td >{registro.rol===1?"👮🏽‍♂️":"👷🏽‍♀️"}</td>
                        <td><Button value={registro.id} className="btn-ls bg-danger" onClick={deleteRegister}>Delete</Button></td>
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
  export default ListUsuario;