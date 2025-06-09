import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Login.css"

export default function Register() {

     const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

    const [rol, setRol] = useState("usuario");

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = Object.fromEntries(new FormData(e.target));
    
        try {
            const response = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (response.status === 201) {
                alert("Usuario creado exitosamente");
                window.location.href = "/login";
            } else if (response.status === 400 || response.status === 422) {
                let mensaje = "Error en los datos:\n";
                const errores = result.errors || {};
    
                for (const campo in errores) {
                    mensaje += `- ${campo}: ${errores[campo].join(", ")}\n`;
                }
    
                alert(mensaje);
            } else {
                alert("No se pudo crear el usuario. Inténtalo nuevamente.");
                console.error("Respuesta inesperada:", result);
            }
        } catch (error) {
            alert("Error al crear el usuario.");
            console.error("Error del servidor:", error);
        }
    };
    

    {/*const handleSubmit = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target));

        const response = await fetch("/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (!response.ok) {
            alert("Error al crear el usuario");
            console.log(result);
        }

        alert("Usuario creado exitosamente");
        window.location.href = "/login";
    };*/}

    return (
        <section className="login-section">
            <div className="login-container">
                <div className="login-card-inner">
                                <h3 className="mb-4">Registro</h3>
                                <form onSubmit={handleSubmit} style={{fontFamily: "Merriweather, serif"}}>
                                    <div className="form-outline mb-3" >
                                        <label
                                            className="form-label"
                                            htmlFor="nombre"
                                            
                                        >
                                            Nombre:
                                        </label>
                                        <input
                                        id="nombre"
                                            name="nombre"
                                            className="form-control"
                                            type="text"
                                            value={nombre}
                                            onChange={(e) => {
                                                const valor = e.target.value;
                                                if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(valor)) {
                                                    setNombre(valor);
                                                }
                                            }}  
                                            required
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            htmlFor="apellido"
                                        >
                                            Apellido:
                                        </label>
                                        <input
                                            type="text"
                                            id="apellido"
                                            name="apellido"
                                            className="form-control"
                                            value={apellido}
        onChange={(e) => {
          const valor = e.target.value;
          if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(valor)) {
            setApellido(valor);
          }
        }}
        required
                                        />
                                    </div>
                                    {/*<div className="form-outline mb-2">
                                        <label
                                            className="form-label"
                                            htmlFor="fecha_nacimiento"
                                        >
                                            Fecha nacimiento:
                                        </label>
                                        <input
                                            required
                                            type="date"
                                            id="fecha_nacimiento"
                                            name="fecha_nacimiento"
                                            className="form-control"
                                        />
                                    </div>*/}
                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            htmlFor="correo"
                                        >
                                            Correo electrónico:
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            id="correo"
                                            name="correo"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            htmlFor="telefono"
                                        >
                                            Telefono:
                                        </label>
                                        <input
                                            type="text"
                                            id="telefono"
                                            name="telefono"
                                            className="form-control"
                                            maxLength="10"
        value={telefono}
        onChange={(e) => {
          const valor = e.target.value;
          if (/^[0-9]*$/.test(valor)) {
            setTelefono(valor);
          }
        }}
        required
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            htmlFor="contraseña"
                                        >
                                            Contraseña:
                                        </label>
                                        <div style={{ position: "relative" }}>
                                         <input
        type={mostrarContraseña ? "text" : "contraseña"}
        id="contraseña"
        name="contraseña"
        className="form-control"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
        style={{
          paddingRight: "40px", // espacio para el ícono
        }}
      />
      <span
        onClick={() => setMostrarContraseña(!mostrarContraseña)}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          color: "#888",
        }}
      >
        {mostrarContraseña ? <FaEyeSlash /> : <FaEye />}
      </span>

                         </div>           
                         </div>
                                    <div className="form-outline mb-3">
                                        <label
                                            className="form-label"
                                            htmlFor="rol"
                                        >
                                            Rol:
                                        </label>
                                        <select
                                            name="rol"
                                            id="rol"
                                            className="form-select"
                                            value={rol}
                                            onChange={(e) => setRol(e.target.value)}
                                        >
                                            <option value="usuario">
                                                Usuario
                                            </option>
                                            <option value="administrador">
                                                Administrador
                                            </option>
                                        </select>
                                    </div>
                                    {/* Mostrar campo clave solo si es administrador */}
                  {rol === "administrador" && (
                    <div className="form-outline mb-3">
                      <label className="form-label" htmlFor="clave_admin">
                        Clave para administrador:
                      </label>
                      <input
                        required
                        type="password"
                        id="clave_admin"
                        name="clave_admin"
                        className="form-control"
                      />
                    </div>
                  )}

                                    <button
                                        className="btn btn-danger btn-lg btn-block"
                                        type="submit"
                                        style={{ backgroundColor: "#a2231d"}}
                                    >
                                        Registrarse
                                    </button>
                                </form>
                            </div>
                        </div>
        </section>
    );
}
