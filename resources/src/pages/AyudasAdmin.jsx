import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AyudasAdmin.css";

const AyudasAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const rol = localStorage.getItem("rol");

  if (!token || rol !== "administrador") {
    navigate("/login");
    return null;
  }

  const [ayudas, setAyudas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoAyuda, setNuevoAyuda] = useState({
    nombre: "",
    fecha: "",
    monto: "",
    causa: "",
  });

  useEffect(() => {
    cargarAyudas();
  }, []);

  const cargarAyudas = () => {
    axios.get("http://localhost:8000/api/ayudas")
      .then((res) => {
        setAyudas(res.data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar ayudas", err);
        setCargando(false);
      });
  };

  const handleCrearAyuda = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/ayudas", nuevoAyuda)
      .then(() => {
        setMostrarModal(false);
        setNuevoAyuda({ nombre: "", fecha: "", lugar: "", monto: "", causa: "" });
        cargarAyudas();
      })
      .catch((err) => console.error("Error al crear ayuda", err));
  };

  return (
    <div className="ayudas-admin-container">
      <header className="ayudas-header">
        <h1>Gestión de Donaciones</h1>
        <button onClick={() => setMostrarModal(true)} className="btn-nueva-ayuda">
          + Nueva Donación
        </button>
      </header>

      {cargando ? (
        <p className="loading-text">Cargando opciones de ayuda...</p>
      ) : (
        <section className="ayudas-grid">
          {ayudas.map((ayuda) => (
            <div className="ayuda-card" key={ayuda.id}>
              <h3>{ayuda.nombre}</h3>
              <p><strong>📅 Fecha:</strong> {ayuda.fecha}</p>
              <p><strong>💰 Monto:</strong> ${ayuda.monto}</p>
              <p><strong>🎯 Causa:</strong> {ayuda.causa}</p>
            </div>
          ))}
        </section>
      )}

      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-form">
            <h2>Registrar Nueva Donación</h2>
            <form onSubmit={handleCrearAyuda}>
              <input
                type="text"
                placeholder="Nombre de la ayuda"
                value={nuevoAyuda.nombre}
                onChange={(e) => setNuevoAyuda({ ...nuevoAyuda, nombre: e.target.value })}
                required
              />
              <input
                type="date"
                value={nuevoAyuda.fecha}
                onChange={(e) => setNuevoAyuda({ ...nuevoAyuda, fecha: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Monto"
                value={nuevoAyuda.monto}
                onChange={(e) => setNuevoAyuda({ ...nuevoAyuda, monto: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Causa"
                value={nuevoAyuda.causa}
                onChange={(e) => setNuevoAyuda({ ...nuevoAyuda, causa: e.target.value })}
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn-cancelar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AyudasAdmin;
