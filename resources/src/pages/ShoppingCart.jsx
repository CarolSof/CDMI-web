import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ShoppingCart.css";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  const rol = localStorage.getItem("rol");

  if (!token || rol !== "usuario") {
    navigate("/login");
    return null;
  }

  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const calcularTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const irAPagar = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch("http://localhost:8000/api/pago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          productos: cartItems,
          total: getTotal(),
         }),
      });

      if (response.ok) {
        const historial = JSON.parse(localStorage.getItem("historial")) || [];
        historial.push({ fecha: new Date(), productos: cartItems });
        localStorage.setItem("historial", JSON.stringify(historial));

        alert("¡Pago realizada con éxito!");
        localStorage.removeItem("cart");
        setCartItems([]);
      } else {
        const error = await response.json();
        alert("Error al guardar la compra: " + error.message);
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      alert("Ocurrió un error durante el pago.");
    }
  };

  return (
    <>
      <div className="login-form shadow">
        <div className="container mt-3">
          <div className="cart">
            <h2 className="mb-4">Carrito de compras <i className="bi bi-cart4"></i></h2>
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              <>
                <div>
                  {cartItems.map((item) => (
                    <div key={item.id} className="cart-item list-group-item d-flex justify-content-between align-items-center">
                      <div className="item-info">
                        <img src={item.imagen} alt={item.name} />
                        <div>
                          <h5>{item.name}</h5>
                          <p>Precio: ${item.price.toLocaleString()} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="quantity-control">
                        <button onClick={() => removeItem(item.id)} className="btn btn-danger btn-sm ms-2">
                          Eliminar
                        </button>
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="total">Total: ${getTotal().toLocaleString()}</div>
                <button className="btn btn-primary mt-2" onClick={irAPagar}>Ir a pagar</button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;


      {/*<div className="login-form shadow">
        <div className="container mt-3">
          <div className="cart">
            <h2 className="mb-4">Carrito de compras <i className="bi bi-cart4"></i></h2>
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
            <><div>
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <div className="item-info">
                        <img src="/img/indigena 5.jpg" src={item.imagen} alt={item.name} />
                        <div>
                          <h5>{item.name}</h5>
                          <p>Precio: ${item.price.toLocaleString()} x {item.quantity}</p>
                        </div>
                      </div>
                      <div className="quantity-control">
                        <button onClick={() => removeItem(item.id)} className="btn btn-danger btn-sm">
                          Eliminar
                        </button>
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      </>

                  ))}
                </div><div className="total">Total: ${getTotal().toLocaleString()}</div><button className="btn btn-outline-light" onClick={irAPagar}>Ir a pagar</button></>
)};</div>
        </div>
      </div>
            
    </>
);
};*/}
