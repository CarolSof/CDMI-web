import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CartShop.css'

const CartShop = () => {
  const [items, setItems] = useState([]);
  const token = localStorage.getItem('auth-token');

  useEffect(() => {
    axios.get('/api/cartshop', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setItems(res.data.items ?? []))
    .catch(err => {
        console.error(err)
        setItems([]);
  });
  }, []);

  const eliminar = (itemId) => {
    axios.delete(`/api/cartshop/${itemId}/remove`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setItems(prev => prev.filter(i => i.id !== itemId)))
    .catch(err => console.error(err));
  };

  const cambiarCantidad = (itemId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    axios.put(`/api/cartshop/${itemId}/update-quantity`, { quantity: nuevaCantidad }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setItems(prevItems => prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: nuevaCantidad } : item
      ));
    })
    .catch(err => console.error(err));
  };

  const finalizarCompra = () => {
    axios.post('/api/cartshop/checkout', {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert("Compra finalizada");
      setItems([]); // Limpiar carrito localmente
    })
    .catch(err => console.error(err));
  };

  const total = (items || []).reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Mi carrito de compras</h2>

      {items.length === 0 ? (
        <p className="cart-empty">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.product_name}</h4>
                  <p>${Number(item.price).toFixed(2)}</p>
                </div>

                <div className="cart-quantity">
                  <button onClick={() => cambiarCantidad(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => cambiarCantidad(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className="btn-remove" onClick={() => eliminar(item.id)}>🗑️</button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="btn-checkout" onClick={finalizarCompra}>Finalizar compra</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartShop;
