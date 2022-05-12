
import Unauthorized from "../containers/Unauthorized";
import { authUser } from "../utils/auth";

const PrivateRoute = ({ component: RouteComponent,role}) => {
    const auth = authUser();
    if(auth.rol == role){
        return <RouteComponent></RouteComponent>
    }
    return <Unauthorized />
}
export default PrivateRoute;