// resources/src/pages/AdminDashboard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "administrador") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
    }

    return (
        /*<div className="d-flex">
            <div className="sidebar vh-100 text-center p-3">
                <img src="img/logocdmi.png" width="70" alt="CDMI Logo" className="header-logo" />
                <h5 className="text-light">CDMI</h5>
                <p className="text-light mb-4">Administrador</p>
                <a href="/logout" className="close-session">Cerrar sesión</a>
                <hr className="bg-light" />
                <nav className="nav flex-column">
                    <a className="nav-link text-white" href="/ventas">Ventas</a>
                    <a className="nav-link text-white" href="/productos-admin">Productos</a>
                    <a className="nav-link text-white" href="/donaciones-admin">Donaciones</a>
                    <a className="nav-link text-white" href="/eventos-admin">Eventos</a>
                </nav>
            </div>*/

            <div className="content">
                <div className="image-container">
                    <div className="image-item">
                        <img
                            src="https://images.pexels.com/photos/26977570/pexels-photo-26977570/free-photo-of-nina-peruana-con-traje-tradicional-en-cusco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Imagen 1"
                        />
                        <p>Texto representativo de la comunidad indígena.</p>
                    </div>
                    <div className="image-item">
                        <img
                            src="https://images.pexels.com/photos/27777049/pexels-photo-27777049/free-photo-of-fiestas-del-cusco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Imagen 2"
                        />
                        <p>Descripción cultural y significativa.</p>
                    </div>
                    <div className="image-item">
                        <img
                            src="https://images.pexels.com/photos/26977570/pexels-photo-26977570/free-photo-of-nina-peruana-con-traje-tradicional-en-cusco.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Imagen 3"
                        />
                        <p>Información relevante y respetuosa.</p>
                    </div>
                </div>
            </div>
        //</div>
    );
}
