import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer" style={{ backgroundColor: "#a2231d"}}>
            <p style={{fontFamily: "Merriweather, serif"}}>&copy; 2024 CDMI. Todos los derechos reservados.</p>
            <p>
                <Link to="/Contacto" className="text-white" style={{fontFamily: "Merriweather, serif"}}>
                    Contáctanos
                </Link>{" "}
                |
                <Link to="/Privacidad" className="text-white" style={{fontFamily: "Merriweather, serif"}}>
                    Política de Privacidad
                </Link>
            </p>
        </footer>
    );
}
