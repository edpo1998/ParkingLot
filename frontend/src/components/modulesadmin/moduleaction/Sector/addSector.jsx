import {
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    } from 'reactstrap'
  import { useState } from 'react';
  import FetchData from '../api/Api';
  
  const addSector = () => {
  
    const [form,setForm] = useState({
      name:'',
      description:''
    })
  
    const EntryRegister =async (e) =>{
      const url = "api/parqueo/sector/"
      const data = new FetchData()
      const datos = await data.request(url,"POST",form)
    }
  
    const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
        });
    }
  
    
    return(
    <>
      <h2>Ingresar Sector al Nivel del Parqueo</h2>
      <div className='containeroption__form'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
              <FormGroup>
                <Label>Name</Label>
                <Input name="name"  onChange={handleChange}></Input> 
              </FormGroup>
              <FormGroup>
              <Label>Descripcion</Label>
              <Input
                name="description"
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
  export default addSector;