import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
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

            const { user, access_token } = response.data.data;

            // Save token and verification status in cookies
            Cookies.set("access_token", access_token, {
                expires: stay_logged_in ? 30 : 1, // 30 days if 'stay_logged_in', otherwise 1 day
                secure: true, // Only for HTTPS
                sameSite: "Strict",
            });

            Cookies.set("verification_status", "true", {
                expires: stay_logged_in ? 30 : 1,
                secure: true,
                sameSite: "Strict",
            });

            // Update Redux state
            dispatch(setUserData(user));
            dispatch(setToken(access_token));
            dispatch(setVerification(true));

            return response;
        } catch (error) {
            const serverErrors = error.response?.data?.message;
            console.log("error", serverErrors);

            if (serverErrors === "Email not verified." && error.response?.data?.access_token) {
                const access_token = error.response.data.access_token;

                // Save unverified token and status in cookies
                Cookies.set("access_token", access_token, {
                    expires: 1,
                    secure: true,
                    sameSite: "Strict",
                });

                Cookies.set("verification_status", "false", {
                    expires: 1,
                    secure: true,
                    sameSite: "Strict",
                });

                // Update Redux state
                dispatch(setToken(access_token));
                dispatch(setVerification(false));
            }

            return error;
        }
    };

    return { login };
};
