import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useFirebaseAuthContext } from "../Contexts/auth-context"

export default function PrivateRoute({ ...props }) {
    const { user } = useFirebaseAuthContext();

    return ( 
        user ? 
            <Outlet/> : 
            <Navigate to="/login" state={{ from: props.path, errorMessage: 'You need to login to access this page.' }} />
    )

}