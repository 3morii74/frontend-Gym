// useLoginService.js
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData, setToken, setVerification } from '../redux/userSlice';

export const LoginService = () => {
    const dispatch = useDispatch();

    const login = async ({ email, password, stay_logged_in }) => {
        try {
            const response = await axios.post(
                "https://api-lvhi.amrnabih.com/api/auth/login",
                {
                    email,
                    password,
                    stay_logged_in,
                }
            );
            console.log("response", response);

            dispatch(setUserData(response.data.data.user));
            dispatch(setToken(response.data.data.access_token));
            dispatch(setVerification(true));
            return response;
        } catch (error) {
            console.log("error", error);

            const serverErrors = error.response?.data.message;
            if (serverErrors === "Email not verified." && error.response?.data.access_token) {
                dispatch(setToken(error.response.data.access_token));
                dispatch(setVerification(false));
            }
            return error;
        }
    };

    return { login };
};
