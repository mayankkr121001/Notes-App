import React, {useEffect} from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from "./auth.js";

function ProtectedRoute() {
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate("/");  
        }
    }, [navigate, auth]);

    return (
                auth.isAuthenticated ? <Outlet/> : null
    )


}

export default ProtectedRoute;