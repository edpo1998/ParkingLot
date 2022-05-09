import {
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    } from 'reactstrap'
  import { useState } from 'react';
  import FetchData from '../api/Api';
  
  const abrirCaja = () => {
  
    const [form,setForm] = useState({
      activo:0,
    })
  
    const EntryRegister =async (e) =>{
      const url = "api/caja/caja/"
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
      <h2>Abrir Caja</h2>
      <div className='containeroption__form'>
        <Form className='container-fluid' onSubmit={EntryRegister}>
              <FormGroup>
                <Label>Activo Inicial</Label>
                <Input name="activo"  onChange={handleChange}></Input> 
              </FormGroup>
            <Button className="btn-lg" onClick={EntryRegister}>Aperturar</Button>
        </Form>
      </div>
      
    </>
  );
  }
  export default abrirCaja;