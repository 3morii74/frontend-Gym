// src/AppInitializer.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setToken, setVerification } from '../redux/userSlice';

const AppInitializer = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('access_token');
        const verificationStatus = Cookies.get('verification_status') === 'true';

        if (token) {
            dispatch(setToken(token));
        }

        dispatch(setVerification(verificationStatus));
    }, [dispatch]);

    return children;
};

export default AppInitializer;
