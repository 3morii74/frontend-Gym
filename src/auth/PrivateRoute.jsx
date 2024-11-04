import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
    const token = Cookies.get("access_token"); // Get token from cookies
    console.log(token);
    return token ? children : <Navigate to="/welcome" />;
};

export default PrivateRoute;
