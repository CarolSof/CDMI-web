import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    axios.get('/api/administrador/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
    console.log('Respuesta orders:', res.data);
    setOrders(res.data);
  })
    .catch(err => console.error('Error al cargar órdenes:', err));
  }, []);

  return (
    <div>
      <h2>Órdenes de Compra (Administrador)</h2>
      {orders.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border p-3 mb-3 rounded">
            <h4>Orden #{order.id} - Usuario: {order.user?.name || 'Desconocido'}</h4>
            <p>Total: ${order.total}</p>
            <p>Estado: {order.status}</p>
            <p>Fecha: {new Date(order.created_at).toLocaleString()}</p>
            <details>
              <summary>Ver detalle de productos</summary>
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.product?.nombre || 'Producto no encontrado'} — Cantidad: {item.quantity} — Precio: ${item.price}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
