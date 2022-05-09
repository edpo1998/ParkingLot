
const BASE_URL = process.env.VITE_BACKEND_ADDR;

async function callApi(endpoint, options = {}) {

  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const url = BASE_URL + endpoint;
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const api_parqueo ={
   estacion:{
       getRegisterBussy(){
        return callApi('api/registros/display/', {
          method: 'GET'
        });
       },
       registrarSalida(salida){
        return callApi('api/registros/display/', {
          method: 'POST',
          body: JSON.stringify(salida),
        });
      },
      getReporte(){
        return callApi('api/registros/detail/', {
          method: 'GET'
        });
      }
   },
}


  
export default api_parqueo;