import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const token = useSelector(state => state.user.token); // Get token from cookies
    const verification = useSelector(state => state.user.verification); // Get token from cookies
    console.log(token, verification);
    return token != "undefined" && verification ? children : <Navigate to="/welcome" />;
};

export default PrivateRoute;
