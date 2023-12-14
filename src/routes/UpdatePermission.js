import React from "react";
import { useLocation, Navigate,  Outlet } from "react-router-dom";


const UpdatePermission = () => {

    const location = useLocation();
    const user = JSON.parse(window.localStorage.getItem("user"))
    console.log("User from Create Permissions", user);
    return (
        user.permissions.includes('Edit')?
        <Outlet/> : 
        <Navigate to = "/home" 
        state={{from: location}} replace
        
        />
    );

};

export default UpdatePermission;