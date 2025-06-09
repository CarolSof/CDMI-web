import React from "react";
import { Link } from "react-router-dom";
import useGetSession from "../hooks/useGetSession";

export default function Header() {
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");
    const { userSession, handleLogout } = useGetSession();

    return (
        <header 
        className="navbar navbar-expand-lg navbar-dark py-4" 
        style={{ backgroundColor: "#a2231d"}}
        >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ fontFamily: "Merriweather, serif" }}>
                    <img src="/img/logocdmi.png" alt="Logo CDMI" style={{ height: "90px", marginRight: "40px" }}/>
                    
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to="/">
                                Home
                            </Link>
                        </li>
                        
                        {token && (
                            <>

                        {/* Mostrar solo si es administrador */}
                        {rol === "administrador" && (
                            <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AdminDashboard">
                                    Inicio
                                </Link>
                            </li>
                            {/*<li className="nav-item">
                                <Link className="nav-link" to="/DonacionesDashboard">
                                    Donaciones A
                                </Link>
                            </li>*/}
                            <Link className="nav-link" to="/AdminCatalogo">
                                Carrito
                             </Link>
                             <li className="nav-item">
                                <Link className="nav-link" to="/AdminOrders">
                                    Ordenes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/EventosAdmin">
                                    Eventos
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/AyudasAdmin">
                                    Donaciones
                                </Link>
                            </li>
                            </> 
                            )}
                        {rol === "usuario" && (
                             <>
                             <li className="nav-item">
                             <Link className="nav-link" to="/CatalogoUsuario">
                             Productos
                             </Link>
                             </li>
                             <li className="nav-item">
                             <Link className="nav-link" to="/CartShop">
                             Carrito
                             </Link>
                             </li>
                             <li className="nav-item">
                             <Link className="nav-link" to="/AyudasUsuario">
                             Donaciones
                             </Link>
                             </li>
                             
                             <li className="nav-item">
                             <Link className="nav-link" to="/HistorialCompras">
                                Mis compras
                             </Link>
                             </li>
                             {/*<li className="nav-item">
                             <Link className="nav-link" to="/CatalogoUsuario">
                                Catálogo
                             </Link>
                             </li>*/}
                             <li className="nav-item">
                             <Link className="nav-link" to="/EventosUsuario">
                                Eventos
                             </Link>
                             </li>

                             {/*<li className="nav-item">
                             <Link className="nav-link" to="/VentasDashboard">
                                Ventas
                             </Link>
                             </li>*/}
                             </>
                        )}
                            </>
                        )}

                        {/* Mostrar Login solo si NO hay sesión */}
                {/*{!token && (
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">
                            Iniciar Sesión
                        </Link>
                    </li>
                )}*/}
                        {userSession ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/profile">
                                        Cuenta
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className=" nav-link" onClick={handleLogout}>
                                        Cerrar Sesion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/login">
                                        Inicio de sesión
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Registro
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link className="nav-link" to="/HomeCDMI">
                                Nosotros
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
