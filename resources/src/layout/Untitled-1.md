<Route path="/perfil" element={<ProtectedRoute allowedRoles={["adminisrador", "usuario"]}><Perfil /></ProtectedRoute>}/>
                <Route path="/UserDashboard" element={<ProtectedRoute allowedRoles={["usuario"]}><UserDashboard /></ProtectedRoute>}/>
                <Route path="/AdminDashboard" element={<ProtectedRoute allowedRoles={["administrador"]}><AdminDashboard /></ProtectedRoute>}/>




                const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "administrador") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
    }