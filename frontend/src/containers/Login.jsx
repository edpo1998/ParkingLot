import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginRequest } from '../actions';
import Header from '../components/Header';
import '../assets/styles/components/Login.scss';
import driver from '../assets/static/driver.png';
import authentication from '../services/api-authentication';

const Login = props => {
  
  const [messageerror,setMessageerror] = useState('')

  const [form, setValues] = useState({
    username: '',
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await authentication.users.login(form)
        if(response.authentication){
            sessionStorage.setItem('session',JSON.stringify(response.data)) 
            props.loginRequest(response.data);
            props.history.push('/empleado');
        }  
        else{
          setMessageerror(response.message)
        }

  }

  return (
    <>
      <Header isLogin />
      <section className="login">
        <section className="login__container">
          <img src={driver} className="login__container-img" />
          {
            messageerror ?
            <p className="alert mt-2 alert-danger">{messageerror}</p>:
            ''
          }
          <form className="login__container--form" onSubmit={handleSubmit}>
                <input
                  name="username"
                  className="form-control mt-2"
                  type="email"
                  placeholder="Correo"
                  onChange={handleInput}
                />
                <input
                  name="password"
                  className="input mt-2"
                  type="password"
                  placeholder="Contraseña"
                  onChange={handleInput}
                />
            <button className="btn btn-secondary btnlogin btn-block mt-5">Iniciar sesión</button>
          </form>
        </section>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  loginRequest,

};

export default connect(null, mapDispatchToProps)(Login);