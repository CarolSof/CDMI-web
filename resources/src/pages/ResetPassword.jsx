import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const correo = searchParams.get('correo');

  const [contraseña, setContraseña] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (contraseña !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          correo,
          contraseña,
          contraseña_confirmation: confirmacion,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje('Contraseña restablecida con éxito. Ahora puedes iniciar sesión.');
      } else {
        setError(data.message || 'Ocurrió un error.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Restablecer Contraseña</h2>
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            value={confirmacion}
            onChange={(e) => setConfirmacion(e.target.value)}
            required
          />
        </div>
        <button type="submit">Restablecer</button>
      </form>
    </div>
  );
}

export default ResetPassword;
