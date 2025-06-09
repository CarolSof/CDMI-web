// src/components/DonationForm.js
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function DonationForm() {
    const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

     // Verificamos si el usuario tiene el rol adecuado
     if (!token || rol !== "usuario") {
      navigate("/login");  // Si no es administrador, redirigimos a login
      return null;
  }

  return (
    <div className="container mt-3">
      <div className="carousel mb-4">
        <img src="/img/indigena5.jpg" alt="Imagen Principal" />
      </div>

      <h1 className="text-dark">Formulario de Donaciones</h1>
      <form action="#" method="post">
        <p className="text-muted mb-4">Puedes contribuir con nuestra causa dejando una donación:</p>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" id="nombre" name="nombre" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico:</label>
          <input type="email" id="email" name="email" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">Cantidad a donar:</label>
          <input type="number" id="cantidad" name="cantidad" min="1" className="form-control" required />
        </div>

        <div className="mb-3">
          <label htmlFor="moneda" className="form-label">Moneda:</label>
          <select id="moneda" name="moneda" className="form-select">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="COP">COP</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">Un mensaje para CDMI <i className="bi bi-chat-right-heart"></i></label>
          <textarea className="form-control" id="mensaje" rows="3"></textarea>
        </div>

        <button type="submit" className="btn btn-outline-light">Donar</button>
      </form>
    </div>
  );
}
