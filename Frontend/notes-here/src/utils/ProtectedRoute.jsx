import React from "react";
import { useNavigate, Outlet } from 'react-router-dom';
import useAuth from "./auth.js";

function ProtectedRoute() {
    const navigate = useNavigate();
    const auth = useAuth();

    return (
                auth.isAuthenticated ? <Outlet/> : navigate("/") 
    )
// function ProtectedRoute({Component, ...rest }) {
//     const navigate = useNavigate();
//     const auth = useAuth();

//     return (

//         <Route {...rest}>
//                 {auth.isAuthenticated ?
//                     <component/>
//                     : navigate("/") }

//         </Route>

//     )

}

export default ProtectedRoute;