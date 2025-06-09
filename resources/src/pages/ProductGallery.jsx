import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";//
import "../styles/ProductGallery.css";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";

const ProductGallery = ({}) => {

  const navigate = useNavigate();
    const token = localStorage.getItem("auth-token");
    const rol = localStorage.getItem("rol");

    // Verificamos si el usuario tiene el rol adecuado
    if (!token || rol !== "usuario") {
        navigate("/login");  // Si no es administrador, redirigimos a login
        return null;
    }

    const handleAddToCart = (producto) => {
      console.log("Añadiendo producto al carrito:", producto);

      const productToAdd = {
        id: producto.id,
        name: producto.titulo,
        price: 6900,
        imagen: producto.imagen
      };

      addToCart(productToAdd);
      alert("Producto añadido al carrito");
    };


  // Datos simulados (pueden venir de props o backend más adelante)
  const productos = new Array(8).fill({
    titulo: "Manilla",
    descripcion:
      "Cada manilla es una obra de arte portátil que celebra la conexión con la naturaleza y la tradición artesanal.",
    imagen: "/img/indigena 2.jpg",
  });

  return (
    <>
      {/*<nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/inicio">
            <img src="/img/logocdmi.png" alt="Logo CDMI" />
            CDMI
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/donaciones">Donaciones <i className="bi bi-coin"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/marketing">Eventos <i className="bi bi-calendar2-check"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/miscompras">Mis compras <i className="bi bi-bag-check"></i></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/carrito">Carrito <i className="bi bi-cart4"></i></a>
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

      <div className="container mt-5">
        <h1 className="text-center text-dark">PRODUCTOS</h1>
        <h5 className="text-center mb-4">Página 2</h5>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {productos.map((producto, index) => (
            <div className="col" key={index}>
              <div className="card h-100">
                <img src={producto.imagen} className="card-img-top" alt={producto.titulo} />
                <div className="card-body">
                <button className="btn btn-outline-success" onClick={() => handleAddToCart(producto)}>
                Añadir al carrito
              </button>
                  <h5 className="card-title">{producto.titulo}</h5>
                  <p className="card-text">{producto.descripcion}</p>
                  <a href="/vermas" className="btn btn-outline-dark">Ver más</a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-3">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item">
                <a className="page-link" href="/producto" aria-label="Anterior">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item"><a className="page-link" href="/producto">1</a></li>
              <li className="page-item"><a className="page-link" href="/page2">2</a></li>
              <li className="page-item"><a className="page-link" href="/page3">3</a></li>
              <li className="page-item">
                <a className="page-link" href="/page3" aria-label="Siguiente">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ProductGallery;
