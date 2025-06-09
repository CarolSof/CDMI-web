import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    axios.get("http://localhost:8000/api/ordenes-finalizadas", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setOrdenes(res.data))
    .catch(err => setError("Error al cargar órdenes"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Historial de Órdenes</h1>
      {ordenes.map((orden) => (
        <div key={orden.id} className="border rounded p-4 mb-4 shadow">
          <p><strong>Número de orden:</strong> {orden.id}</p>
          <p><strong>Usuario:</strong> {orden.user?.nombre}</p>
          <p><strong>Fecha:</strong> {new Date(orden.created_at).toLocaleString()}</p>
          <p><strong>Total:</strong> ${orden.total}</p>
          <p><strong>Estado:</strong> {orden.estado ?? 'Finalizado'}</p>

          <div className="mt-4">
            <h2 className="font-semibold">Productos comprados:</h2>
            <ul className="list-disc list-inside">
              {orden.items.map(item => (
                <li key={item.id}>
                  {item.inventario?.nombre} - {item.cantidad} × ${item.precio_unitario} = ${item.cantidad * item.precio_unitario}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
