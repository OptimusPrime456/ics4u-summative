import { useStoreContext } from "../context";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const { user } = useStoreContext();

    return (
        user ? <Outlet /> : <Navigate to="/login"/>
    );
}

export default ProtectedRoutes