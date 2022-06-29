import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute(props) {
    const { currentUser } = useContext(AuthContext);

    return (
        currentUser.loggedIn ? props.children : <Navigate to='/login' />
    )

}

export function PublicRoute(props) {
    const { currentUser } = useContext(AuthContext);

    return (
        !currentUser.loggedIn ? props.children : <Navigate to='/store' />
    )

}