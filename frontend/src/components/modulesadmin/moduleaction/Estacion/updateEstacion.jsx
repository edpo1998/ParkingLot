
  import {
    Form,
    FormGroup,
    Input,
    Button,
    Label,
    } from 'reactstrap'
  import { useState,useEffect } from 'react';
  import FetchData from '../api/Api';


  const UpdateEstacion = ({handleMessage}) => {

    const [dataComboBox, setDataComboBox] =  useState({})
    const [search,setSearch] = useState({
        id:'',
      })

      const [form,setForm] = useState({
        number:'',
        state:false,
        description:'',
        level:'',
        sector:'',
        position:''
      })
  
    const EntryRegister =async (e) =>{
      try {
        const url = "api/parqueo/estacion/"+form.id+"/"
        const data = new FetchData()
        await data.request(url,"PUT",form)
        handleMessage({
          header:'🟢 Estado del registro',
          message:'Estacion actualizada con exito',
          state:true
        })
      } catch (error) {
        handleMessage({
          header:'🔴 Estado del registro',
          message:`Ocurrio un error al actualizar el Registro`,
          state:true
        });
      }
      
    }
  
    const handleChange = (e) => {
    
    if(e.target.name == "state"){
        setForm({
            ...form,
            [e.target.name]: !form.state,
          });
    }else{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
    }
  }
  
  const handleChangeCbx = (e) => {
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
            const url = "api/parqueo/estacion/"+search.id+"/"
            const data = new FetchData()
            const datos = await data.request(url,"GET")
            setForm(datos)
        }
          getResponse()
        
    }

    useEffect( () => {
        const getResponse = async () => {
        const data = new FetchData()
          const response =  ({
            levels: await await data.request( "api/parqueo/level/","GET"),
            sectores: await await data.request( "api/parqueo/sector/","GET"),
            posiciones: await await data.request( "api/parqueo/position/","GET"),
          })
          return response
        }
        getResponse()
        .then(response => setDataComboBox(response))
        
      }, []);
    return(
    <>
      <h2>Modificar Posicion de Elevador</h2>
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
            <Label>Numero</Label>
            <Input name="number" value={form.number} onChange={handleChange}></Input> 
          </FormGroup>
          <FormGroup check>
            <Label check>
                <Input name="state" type="checkbox" value={form.state} onChange={handleChange} />{' '}
                Estado
            </Label>
          </FormGroup>
          <FormGroup>
            <Label>Nivel</Label>
            <select className="form-select" name="level" value={form.level} onChange={handleChangeCbx} >
              <option value="">Seleccione el nivel</option>
              {
                dataComboBox["levels"].map((marca)=>
                  <option key={marca.id} value={marca.id}>{marca.level}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Sector</Label>
            <select className="form-select" name="sector" value={form.sector} onChange={handleChangeCbx}>
              <option value="">Seleccione el sector</option>
              {
                dataComboBox["sectores"].map((registro)=>
                  <option key={registro.id} value={registro.id}>{registro.name}</option>
                )
              }
            </select>
          </FormGroup>
          <FormGroup>
            <Label>Posicion</Label>
            <select className="form-select" name="position" value={form.position} onChange={handleChangeCbx}>
              <option value="">Seleccione la posicion </option>
              {
                dataComboBox["posiciones"].map((tipo)=>
                  <option key={tipo.id} value={tipo.id}>{tipo.level}</option>)
              }
            </select> 
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
        </Form>:
      <h1>Loading...</h1>
      }
      </div>
      
    </>
  );
  }
  export default UpdateEstacion;