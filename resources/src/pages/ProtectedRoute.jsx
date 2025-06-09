// resources/src/components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    if (!token) return <Navigate to="/login" />;

    if (!allowedRoles.includes(rol)) {
        return <Navigate to="/" />;
    }

    return children;
}
