
const BASE_URL = process.env.VITE_BACKEND_ADDR;

async function callApi(endpoint, options = {}) {

  options.headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const url = BASE_URL + endpoint;
  console.log(BASE_URL)
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

const authentication ={
   users:{
       login(user){
        return callApi('auth/', {
          method: 'POST',
          body: JSON.stringify(user),
        });
       }
   } 
}

  
export default authentication;