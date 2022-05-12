const reducer = (state, action) => {
    switch (action.type) {

      case 'LOGIN_REQUEST':
        return {
          ...state,
          user: action.payload,
        }

        
      case 'LOGOUT_REQUEST':
        return {
          ...state,
          user: action.payload,
        }

      case 'MESSAGE_ERROR':
         return {
          ...state,
          message_error: action.payload,
       }

      default: 
        return state;
    }
  }
  
  export default reducer;