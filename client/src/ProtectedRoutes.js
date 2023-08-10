import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () =>{

    let isAuthenticated = localStorage.getItem('islogged')
    console.log(isAuthenticated)
    return (
        isAuthenticated === 'true' ? <Outlet/> : <Navigate to= '/login'/>
    )
    

}

export default ProtectedRoute;