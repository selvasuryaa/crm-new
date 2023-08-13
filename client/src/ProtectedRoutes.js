import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Authservice from "./SERVICES/Authservice";


const ProtectedRoute = ({logout}) => {
    const storedToken = Authservice.getToken()

    const [token, setToken] = useState(storedToken)

    useEffect(() => {
        if (storedToken) {
            setToken(storedToken)
        }
    }, [storedToken])

    if (token) {
        console.log('Token is present:', token);
    }

    return (
        token ? <Outlet /> : <Navigate to='/' />
    )
}
export default ProtectedRoute;