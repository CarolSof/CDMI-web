import React from "react";
import { Link } from "react-router-dom";
import useGetSession from "../hooks/useGetSession";
import LogoutButton from '../pages/LogoutButton';

export default function Header() {
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");
    const { userSession, handleLogout } = useGetSession();

    return (
        <header 
        className="navbar navbar-expand-lg navbar-dark py-1" 
        style={{ backgroundColor: "#a2231d"}}
        >
            <div className="container-fluid d-flex justify-content-between align-items-center">
  {/* Menú izquierdo */}
  <ul className="navbar-nav d-flex flex-row gap-3">
    <li className="nav-item">
      <Link className="nav-link" to="/" title="Inicio"><i className="bi bi-house-door-fill fs-5"></i></Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/HomeCDMI" title="Nosotros"><i className="bi bi-people-fill fs-5"></i></Link>
    </li>
    {token && (<>
    {rol === "usuario" && (
      <>
        <li className="nav-item">
            <Link className="nav-link" to="/EventosUsuario" title="Eventos"><i className="bi bi-calendar-event fs-5"></i></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/AyudasUsuario" title="Donaciones"><i className="bi bi-gift fs-5"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/CatalogoUsuario" title="Catálogo"><i className="bi bi-tag fs-5"></i></Link>
        </li>
      </>
    )}
    {rol === "administrador" && (
      <>
        {/*<li className="nav-item">
          <Link className="nav-link" to="/AdminDashboard">Inicio</Link>
        </li>*/}
        <li className="nav-item">
          <Link className="nav-link" to="/AdminCatalogo" title="Gestión del carrito"><i className="bi bi-cart fs-5"></i></Link>
        </li>
        {/*<li className="nav-item">
            <Link className="nav-link" to="/AdminOrders">Ordenes</Link>
        </li>*/}
        <li className="nav-item">
            <Link className="nav-link" to="/EventosAdmin" title="Gestión de eventos"><i className="bi bi-calendar-event fs-5"></i></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/AyudasAdmin" title="Gestión de donaciones"><i className="bi bi-gift fs-5"></i></Link>
        </li>
      </>
    )}
    </>
    )}

  </ul>

  {/* Logo en el centro */}
  <Link className="navbar-brand mx-auto" to="/" >
    <img
      src="/img/logocdmi.png"
      alt="Logo CDMI"
      style={{ height: "90px" }}
    />
  </Link>

  {/* Menú derecho */}
  <ul className="navbar-nav d-flex flex-row gap-3">
    {userSession ? (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/perfil" title="Perfil"><i className="bi bi-person fs-5"></i></Link>
        </li>
    {rol === "usuario" && (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/CartShop" title="Carrito"><i className="bi bi-cart fs-5"></i></Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/HistorialCompras" title="Historial"><i className="bi bi-bag fs-5"></i></Link>
        </li>
        </>
    )}
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout} title="Cerrar sesión">
            <i className="bi bi-box-arrow-right fs-5"></i>
          </button>
        </li>
      </>
    ) : (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login" title="Iniciar sesión"><i className="bi bi-box-arrow-in-right fs-5"></i></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register" title="Registrarse"><i className="bi bi-person-plus fs-5"></i></Link>
        </li>
      </>
    )}
    
  </ul>
</div>

        </header>
    );
}
