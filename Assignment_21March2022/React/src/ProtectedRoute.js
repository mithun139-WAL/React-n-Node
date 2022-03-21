import { Navigate, Outlet } from "react-router-dom";
import React from "react";
const ProtectedRoute = () => {
    let loggedIn = localStorage.getItem("LoggedIn");
    loggedIn = parseInt(loggedIn);
    if(loggedIn){
        console.log("LoggedIn");
        return <Outlet/>;
    }else{
        console.log("Not Logged In");
        return <Navigate to="/login" />;
    }
}
export default ProtectedRoute;