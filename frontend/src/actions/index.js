
  const LOGIN_REQUEST = 'LOGIN_REQUEST';
  const LOGOUT_REQUEST = 'LOGOUT_REQUEST';



  export const loginRequest = payload => ({
    type: LOGIN_REQUEST,
    payload,
  });
  
  export const logoutRequest = payload => ({
    type: LOGOUT_REQUEST,
    payload,
  });
  
 