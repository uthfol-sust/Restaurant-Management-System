import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    const role = user.role.toLowerCase();

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
