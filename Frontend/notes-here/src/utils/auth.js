import { useState, useEffect } from "react";
import api from "../interceptors/axios.js"

function useAuth() {
    const [auth, setAuth] = useState({ isAuthenticated: false, user: null });

    useEffect(() => {
        const checkAuthStatus = async () => {
            await api.get('/user/authorized-user')
                .then((response) => {
                    // console.log(response.data.user)
                    setAuth({ isAuthenticated: true, user: response.data.user });
                })
                .catch((error) => {
                    // console.log(error);
                    setAuth({ isAuthenticated: false, user: null });

                })
        }

        checkAuthStatus();
    }, []);

    return auth;
}

export default useAuth;