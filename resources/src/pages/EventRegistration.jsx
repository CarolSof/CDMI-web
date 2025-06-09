import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";//
import "../styles/EventRegistration.css";
import { useNavigate } from "react-router-dom";

const EventRegistration = () => {

  const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "usuario") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
    }

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    event: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, event } = form;

    alert(`¡Registro exitoso!
Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Evento: ${event}`);

    setForm({
      name: "",
      email: "",
      phone: "",
      event: ""
    });
  };

  return (
    <>
      {/*<nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/img/logocdmi.png" alt="Logo CDMI" />
            CDMI
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link text-white" href="/producto">Productos <i className="bi bi-box2-heart"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/donaciones">Donaciones <i className="bi bi-coin"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/marketing">Eventos <i className="bi bi-calendar2-check"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/miscompras">Mis compras <i className="bi bi-bag-check"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/carrito">Carrito <i className="bi bi-cart4"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/perfil"><i className="bi bi-person"></i> Perfil</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="/logout"><i className="bi bi-box-arrow-right"></i> Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>*/}

      <div className="container">
        <div className="event-form shadow-lg p-4">
          <h2 className="text-center">Registro para el Evento</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nombre completo</label>
              <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Número de teléfono</label>
              <input type="tel" className="form-control" id="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="event" className="form-label">Seleccionar evento</label>
              <select className="form-select" id="event" value={form.event} onChange={handleChange} required>
                <option value="" disabled>Seleccione un evento</option>
                <option value="Feria Artesanal Indígena">Feria Artesanal Indígena</option>
                <option value="Taller de Tejido Tradicional">Taller de Tejido Tradicional</option>
                <option value="Exposición de Arte Indígena">Exposición de Arte Indígena</option>
              </select>
            </div>
            <button type="submit" className="btn btn-register w-100">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventRegistration;
