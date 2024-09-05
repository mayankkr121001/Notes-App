import React, { useEffect } from "react";
import { useNavigate, Navigate, Link, Outlet } from 'react-router-dom';
import useAuth from "./auth.js";
import { ColorRing } from 'react-loader-spinner'


function ProtectedRoute() {
    const auth = useAuth();


    if (auth.isAuthenticated === undefined) {
        return <div style={{textAlign: "center"}}><ColorRing
        visible={true}
        height="50"
        width="50"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    /></div>;  // Display a loading indicator while checking auth
    }
    
    return (
         auth.isAuthenticated ? <Outlet /> : <Navigate to="/" replace={true}/>
    )

}

export default ProtectedRoute;