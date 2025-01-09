import { useStoreContext } from "../context";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const { user } = useStoreContext();
    const { signedIn } = useStoreContext();

    return (
        signedIn ? <Outlet /> : <Navigate to="/login"/>
    );
}

export default ProtectedRoutes