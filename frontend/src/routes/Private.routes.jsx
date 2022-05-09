
import "../containers/Unauthorized"
import Unauthorized from "../containers/Unauthorized";
const PrivateRoute = ({ component: RouteComponent,role}) => {
    const auth = role=="admin"?true:false;
    return (
        auth ? (<RouteComponent/>) : (<Unauthorized></Unauthorized>)
    );
}

export default PrivateRoute;