// src/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
    const token = useSelector(state => state.user.token);
    const verification = useSelector(state => state.user.verification);

    console.log('Token:', token, 'Verification:', verification);

    return token && verification ? children : <Navigate to="/welcome" />;
};

export default PrivateRoute;
