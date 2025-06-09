import React, { useState } from "react";
import axios from "axios";
import '../styles/ForgotPassword.css';

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    try {
      const response = await axios.post("/api/forgot-password", { correo });

      // Asumimos que tu backend responde bien con status 200 y un mensaje
      setMensaje("Si ese correo existe, hemos enviado un enlace para restablecer la contraseña.");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Error al enviar el correo. Intentar de nuevo más tarde.");
      }
    }
  };

  return (
    <section className="forgot-password-section">
        <div className="forgot-container">
      <h3>Recuperar contraseña</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" type="submit" style={{backgroundColor: '#a2231d', border:'#a2231d'}}>
          Enviar enlace
        </button>
      </form>

      {mensaje && <p style={{ color: "black", marginTop: "1rem" }}>{mensaje}</p>}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </div>
    </section>
  );
}
