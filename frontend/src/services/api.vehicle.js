
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

const data_vehicle ={
   modelos:{
       getdata(){
        return callApi('api/vehicles/modelo/', {
          method: 'GET'
        });
       }
   },
   marcas:{
    getdata(){
     return callApi('api/vehicles/brand/', {
       method: 'GET'
     });
    }
  },
  tiposvehiculo:{
    getdata(){
     return callApi('api/vehicles/typevehicle/', {
       method: 'GET'
     });
    }
  },
  tipoconductor:{
    getdata(){
     return callApi('api/vehicles/typepropietary/', {
       method: 'GET'
     });
    }
  },

  vehicle:{
    insert(vehicle){
     return callApi('api/vehicles/vehicle/', {
       method: 'POST',
       body: JSON.stringify(vehicle),
     });
    }
} 
}

  
export default data_vehicle;