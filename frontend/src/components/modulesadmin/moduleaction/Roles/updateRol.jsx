import {
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    } from 'reactstrap'
  import { useState } from 'react';
  import FetchData from '../api/Api';
  
  const updateRol = () => {

    const [search,setSearch] = useState({
        id:'',
      })

    const [form,setForm] = useState({
      name:'',
      description:''
    })
  
    const EntryRegister =async (e) =>{
      const url = "api/team/roles/"+form.id+"/"
      const data = new FetchData()
      const datos = await data.request(url,"PUT",form)
    }
  
    const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    }
    
    const handleSearch = (e) => {
        setSearch({
            ...search,
            [e.target.name]: e.target.value,
          });
    }
    
    const sendData = () => {
        const getResponse = async () => {
            const url = "api/team/roles/"+search.id+"/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            setForm(datos)
        }
          getResponse()
    }

    return(
    <>
      <h2>Modificar Rol de Usuario</h2>
      <div className='containeroption__form'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
                <div className="input-group" style={{justifyContent:"right"}}>
                    <div className="form-outline">
                        <input name="id" onChange={handleSearch} className="form-control" />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={sendData}>🔎</button>
                </div>
              <FormGroup>
                <Label>Nivel</Label>
                <Input name="name"  onChange={handleChange} value={form.name}></Input> 
              </FormGroup>
              <FormGroup>
              <Label>Descripcion</Label>
              <Input
                name="description"
                value={form.description}
                type="textarea"
                style={{resize:'none'}}
                maxLength={100}
                onChange={handleChange}
              />
            </FormGroup>  
            <Button className="btn-lg" onClick={EntryRegister}>Registrar</Button>
        </Form>
      </div>
      
    </>
  );
  }
  export default updateRol;