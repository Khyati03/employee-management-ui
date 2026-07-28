import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (userRole !== role) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default RoleProtectedRoute;