import axios from "axios";
// import { useNavigate } from "react-router-dom";


const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true
})


// Response interceptor for refreshing AccessToken
api.interceptors.response.use(response => response, 
    async(error) =>{
        const originalRequest = error.config;

        if (originalRequest.url === "/user/refresh-token") {
            // Redirect to login if refresh token request fails
            window.location.href = "/";
            return Promise.reject(error);
        }

        if(error.response.status === 401 && !originalRequest._retry){
            originalRequest._retry = true

            try {
                await api.post("/user/refresh-token", {withCredentials: true});
                return api(originalRequest)
            } catch (error) {
                console.error("Refresh token expired or invalid", error);
                window.location.href="/";
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;
