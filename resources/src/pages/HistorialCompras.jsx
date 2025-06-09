import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HistorialCompras.css'

const HistorialCompras = () => {
  const [compras, setCompras] = useState([]);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    axios.get('/api/historial', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setCompras(res.data))
    .catch(err => console.error('Error al obtener historial:', err));
  }, []);

  return (
    <div className="historial-container">
      <h2 className="historial-title">📜 Historial de Compras</h2>

      {compras.length === 0 ? (
        <p className="historial-empty">No hay compras realizadas aún.</p>
      ) : (
        compras.map(order => (
          <div key={order.id} className="compra-card">
            <h4 className="compra-header">Compra #{order.id}</h4>
            <p className="compra-total">💰 Total: ${order.total}</p>
            <p className="compra-estado">📦 Estado: <strong>{order.status}</strong></p>

            <ul className="compra-items">
              {order.items.map(item => (
                <li key={item.id} className="compra-item">
                  <span>🧾 Producto #{item.inventario_id}</span>
                  <span>🛒 Cantidad: {item.quantity}</span>
                  <span>💵 Precio: ${Number(item.price).toFixed(2)}</span>
                  <span>🔢 Subtotal: ${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default HistorialCompras;
