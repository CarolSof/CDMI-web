// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CustomStyles.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#00ff00"}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/img/logocdmi.png" alt="Logo CDMI" />
          CDMIII
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/producto">Productos <i className="bi bi-box2-heart"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/marketing">Eventos <i className="bi bi-calendar2-check"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/miscompras">Mis compras <i className="bi bi-bag-check"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/carrito">Carrito <i className="bi bi-cart4"></i></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/perfil"><i className="bi bi-person"></i> Perfil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/logout"><i className="bi bi-box-arrow-right"></i> Cerrar sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
