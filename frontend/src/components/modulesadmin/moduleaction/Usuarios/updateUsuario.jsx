import React,{useState,useEffect} from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  } from 'reactstrap'
import FetchData from '../api/Api';

const UpdateUsuario = ({handleMessage}) => {

  const [dataComboBox, setDataComboBox] =  useState({})

  const [search,setSearch] = useState({
    id:'',
  })

  // Values 
  const [form,setForm] = useState({
    email:'',
    name:'',
    surname:'',
    username:'',
    rol:'',
    password:''
  })
 

  const EntryRegister =async (e) =>{
    try {
      const url = "api/team/users/"+form.id+"/"
      const data = new FetchData()
      await data.request(url,"PUT",form)
      handleMessage({
        header:'🟢 Estado del registro',
        message:'Usuario actualizado con exito',
        state:true
      })
    } catch (error) {
      handleMessage({
        header:'🔴 Estado del registro',
        message:`${error}`,
        state:true
      });
    }
    

    }

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
  }


  const handleChangeCbx = (e) => form[e.target.name]= e.target.value

  const handleSearch = (e) => {
    setSearch({
        ...search,
        [e.target.name]: e.target.value,
      });
    }


    const sendData = () => {
        const getResponse = async () => {
            const url = "api/team/users/"+search.id+"/"
            const data = new FetchData()
            const response = await data.request(url,"GET")
            return response
        }

        getResponse()
        .then(response => setForm(response))
        .catch(error=> handleMessage({
          header:'🔴 Busqueda de usuario',
          message:`Usuario Inexistente`,
          state:true
        }))
        
    }

    useEffect( () => {
        const getResponse = async () => {
        const data = new FetchData()
          const response =  ({
            roles: await await data.request( "api/team/roles/","GET"),
          })
          return response
        }
        getResponse()
        .then(response => setDataComboBox(response))
        
      }, []);


  return(
  <>
    <h2>Actualizar Usuario</h2>
    <div className='containeroption__form'>
            <div className="input-group" style={{justifyContent:"right"}}>
                <div className="form-outline">
                    <input name="id" onChange={handleSearch} className="form-control" />
                </div>
            <button type="button" className="btn btn-primary" onClick={sendData}>🔎</button>
            </div>
      {
      Object.keys(dataComboBox).length>0 ?
        <Form className='container-fluid' onSubmit={EntryRegister}>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" value={form.email} onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Username</Label>
            <Input name="username" value={form.username} onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Nombre</Label>
            <Input name="name" value={form.name} onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup>
            <Label>Apellido</Label>
            <Input name="surname" value={form.surname} onChange={handleChange}></Input> 
          </FormGroup>

          <FormGroup>
            <Label>Rol</Label>
            <select className="form-select" name="rol" value={form.rol?form.rol:0} onChange={handleChangeCbx}>
              <option value="">Seleccione el rol </option>
              {
                dataComboBox["roles"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.name}</option>)
              }
            </select> 
          </FormGroup>
          <FormGroup>
            <Label>Contrasenia</Label>
            <Input type="password" name="password" onChange={handleChange}></Input> 
          </FormGroup>

          <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
        </Form>:
      <h1>Loading...</h1>
      }
    </div>
  </>

);
}
export default UpdateUsuario;