import Unauthorized from "../containers/Unauthorized";
import Home from "../containers/Home";
const authUser = ()=>{
   
    if(sessionStorage.getItem("session")){
        const session_active = JSON.parse(sessionStorage['session']);
        if(session_active){
            return session_active
        }else{
            return false
        }
    }
    return false
}

export const isLogged = (component)=>{
    const usersession = authUser()
    if(usersession){
        return Home
    }else{
        return component
    }
}

export const verifyRol = (role,component) =>{
    const usersession = authUser()
    const is_correct = role.some(arrVal => usersession.rol == arrVal)
    if(is_correct){
        return component
    }else{
        return Unauthorized
    }
}