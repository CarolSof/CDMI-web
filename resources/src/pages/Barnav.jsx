import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const rol = localStorage.getItem("rol");
    const token = localStorage.getItem("auth-token");

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("rol");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    MiApp
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        {token && rol === "usuario" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/perfil">
                                        Perfil
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-dashboard">
                                        Dashboard Usuario
                                    </Link>
                                </li>
                            </>
                        )}
                        {token && rol === "administrador" && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin-dashboard">
                                        Panel Admin
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/usuarios">
                                        Gestión de Usuarios
                                    </Link>
                                </li>
                            </>
                        )}
                        {token ? (
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Cerrar Sesión
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Iniciar Sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Registrarse
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
