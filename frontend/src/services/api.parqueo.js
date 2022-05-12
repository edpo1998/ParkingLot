
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
       getdata(){
        return callApi('api/parqueo/estacion/free', {
          method: 'GET'
        });
       },
       generateTicket(ticket){
        return callApi('api/registros/ticket/', {
          method: 'POST',
          body: JSON.stringify(ticket),
        });
       },
       getRegisterBussy(){
        return callApi('api/registros/display', {
          method: 'GET'
        });
       },
      
   },
}


  
export default api_parqueo;