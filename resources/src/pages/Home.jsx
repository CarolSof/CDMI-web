import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <>
            
            <Helmet>
                <title>CDMI - Bienvenido</title>
            </Helmet>
            <div>

                <div style={{ fontFamily: "Merriweather, serif" }}id="carouselExampleCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src="/img/firstlabel.jpg"
                                className="d-block w-100"
                                alt="..."
                                style={{ height: '400px', objectFit: 'cover'}}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p>
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/img/jaguar.jpg"
                                className="d-block w-100"
                                alt="..."
                                style={{ height: '400px', objectFit: 'cover'}}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p>
                                    
                                </p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src="/img/sol.jpg"
                                className="d-block w-100"
                                alt="..."
                                style={{ height: '400px', objectFit: 'cover'}}
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5></h5>
                                <p>
                                
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                <div className="hero-section" style={{ fontFamily: "Merriweather, serif" }}>
                    <h1>Hilamos saberes, tejemos resistencia</h1>
                    <Link
                    to="/register"
                    className="btn"
                    style={{ zIndex: 9999, position: 'relative', backgroundColor: '#e1c699', // dorado
    color: 'black',
    border: '2px solid #e1c699' }}
                    >
                    ¡Únete Ahora!
                    </Link>
                    
                </div>

                <div className="section" style={{ fontFamily: "Merriweather, serif", backgroundColor: "#e1c699", color: "#FFFF", padding: "2rem" }}>
                    <h2>¿Quiénes Somos?</h2>
                    <p style={{color:"#fff", padding:"1rem", borderRadius: "10px",
                                        maxWidth: "600px",      // máximo ancho
                                        width: "100%",          // se adapta horizontalmente
                                        margin: "1rem auto",
                                        boxSizing: "border-box"}}>
                        En CDMI, nos dedicamos a preservar y promover las
                        tradiciones culturales a través de productos únicos y
                        eventos comunitarios. Conoce más sobre nuestro impacto y
                        cómo estamos cambiando vidas.
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <img
                        src="/img/sentada.jpeg"
                        alt="Imagen 1"
                        style={{ width: "300px", borderRadius: "10px" }}
                    />
                    <img
                        src="/img/indio.jpeg"
                        alt="Imagen 2"
                        style={{ width: "300px", borderRadius: "10px" }}
                    />
                    <img
                        src="/img/tradicion.jpeg"
                        alt="Imagen 3"
                        style={{ width: "300px", borderRadius: "10px" }}
                    />
                    </div>

                </div>

                <div className="section" style={{fontFamily: "Merriweather, serif"}}>
                    <h2>Eventos Destacados</h2>
                    <p style={{color:"#000", padding:"1rem", borderRadius: "10px",
                                        maxWidth: "600px",      // máximo ancho
                                        width: "100%",          // se adapta horizontalmente
                                        margin: "1rem auto",
                                        boxSizing: "border-box"}}>
                        Participa en nuestros eventos y celebra con nosotros la
                        riqueza de nuestra cultura. Desde talleres hasta ferias,
                        siempre hay algo emocionante que ocurre en CDMI.
                    </p>
                    <img src="/img/calendario.jpg" alt="Eventos" style={{ width: "24%", display: "block", margin: "0 auto", borderRadius: "8px" }} />
                </div>


            </div>
        </>
    );
}

