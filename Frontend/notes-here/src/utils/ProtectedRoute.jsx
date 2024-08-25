import React from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from "./auth.js";

function ProtectedRoute() {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
                auth.isAuthenticated ? <Outlet/> : navigate("/") 
    )


}

export default ProtectedRoute;