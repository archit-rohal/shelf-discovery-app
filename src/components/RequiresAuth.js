import {useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {AuthContext} from "../contexts/AuthProvider";

export function RequiresAuth({children}) {
    let location = useLocation();
    const {isLoggedIn} = useContext(AuthContext);
    return isLoggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{from: location}}/>
    );
}