// resources/js/pages/Catalogo.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CatalogoUsuario.css'

const CatalogoUsuario = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem('auth-token');
  if (!token) {
    console.log("No hay token guardado");
    return;
  }

  axios.get('/api/inventarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    console.log("Respuesta del backend:", res.data);
    setProductos(res.data);
  })
  .catch(err => console.error(err));
}, []);


  const agregarAlCarrito = (id) => {
    const token = localStorage.getItem('auth-token'); // Asumimos que guardas el token aquí

    axios.post(`/api/cartshop/${id}/add`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => alert("Producto agregado"))
    .catch(err => console.error(err));
  };

  return (
      <div className="catalogo-container">
      <h2 className="catalogo-title">Catálogo de Productos</h2>
      <div className="catalogo-grid">
        {productos.map(prod => (
          <div key={prod.id} className="producto-card">
             <img
      src={`http://localhost:8000/storage/${prod.imagen}`}
      alt={prod.nombre}
      className="producto-imagen"
    />
            <h3>{prod.nombre}</h3>
            <p className="descripcion">{prod.descripcion}</p>
            <p className="precio">${prod.precio}</p>
            <button
              className="btn-agregar"
              onClick={() => agregarAlCarrito(prod.id)}
            >
              Agregar al carrito +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogoUsuario;
