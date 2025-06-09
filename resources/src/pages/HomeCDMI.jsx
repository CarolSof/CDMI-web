import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";//
import "../styles/HomeCDMI.css";

const HomeCDMI = () => {
  return (
    <>
      {/*<nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/img/logocdmi.png" alt="Logo CDMI" />
            CDMI
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/iniciosesion">Inicio de sesión</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/registro">Registro</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>*/}

      <div className="container">
        <div className="section-header">
          <h1 className="text-dark" style={{fontFamily: "Merriweather, serif"}}>Bienvenido a CDMI</h1>
          <p style={{fontFamily: "Merriweather, serif"}}>Descubre nuestras iniciativas y proyectos para apoyar a las comunidades indígenas</p>
        </div>

        <div className="section-content row">
          <div className="col-md-6 img-container">
            <img src="/img/logocdmiN.png" className="img-fluid" alt="Imagen representativa" />
          </div>
          <div className="col-md-6" style={{fontFamily: "Merriweather, serif"}}>
            <h2>Conoce más sobre nuestros proyectos</h2>
            <p>Descubre el impacto y la creatividad detrás de cada uno de nuestros proyectos. En nuestra organización, trabajamos día a día para desarrollar iniciativas innovadoras que generan valor y contribuyen al bienestar de la comunidad. Te invitamos a explorar en detalle cada uno de nuestros proyectos, conocer sus objetivos, los equipos que los hacen posibles y los resultados alcanzados hasta ahora.</p>
            <p>Al conocer más sobre nuestros proyectos, podrás inspirarte, comprender nuestro compromiso y, si lo deseas, sumarte a nuestras próximas iniciativas. Tu interés y participación son fundamentales para seguir creciendo y haciendo realidad nuevas ideas. ¡Descubre todo lo que estamos construyendo juntos!</p>
          </div>
        </div>

        <div className="section-content row mt-5">
          <div className="col-md-6" style={{fontFamily: "Merriweather, serif"}}>
            <h2>Más información</h2>
            <p>¿Quieres conocer todos los detalles? En esta sección encontrarás información ampliada sobre nuestros proyectos, servicios y todo lo que ofrecemos para ayudarte a tomar la mejor decisión. Aquí ponemos a tu disposición recursos, datos específicos, preguntas frecuentes y contacto directo para resolver cualquier duda que tengas.</p>
          </div>
          <div className="col-md-6 img-container">
            {/*<img src="/img/indio.jpg"  alt="Imagen representativa" />*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCDMI;
