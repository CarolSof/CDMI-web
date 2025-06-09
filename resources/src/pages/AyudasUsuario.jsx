import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../pages/ui/card";
import Modal from "../pages/Modal";
import "../styles/AyudasUsuario.css"

const AyudasUsuario = () => {
    const [ayudas, setAyudas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [ayudaSeleccionado, setAyudaSeleccionado] = useState(null);

    axios.defaults.baseURL = "http://localhost:8000";
    const token = localStorage.getItem("auth-token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    useEffect(() => {
        const response = axios.get("/api/ayudas");
        response.then((res) => {
            setAyudas(res.data);
            setCargando(false);
        });
    }, []);

    const [registrandoAyudaId, setRegistrandoAyudaId] = useState(null);

    const registrarse = async (ayudaId) => {
        setRegistrandoAyudaId(ayudaId);

        try {
            await axios.post(`/api/ayudas/${ayudaId}/registrarse`);

            alert("✅ Donaste exitosamente, mil gracias.");
        } catch (err) {
            if (err.response?.status === 409) {
                return alert("⚠️ Ya donaste aquí.");
            }
            if (err.response?.status === 401) {
                return alert("🔒 Debes iniciar sesión para donar.");
            }

            alert("❌ Error al realizar la donación.");
        } finally {
            setRegistrandoAyudaId(false);
        }
    };

    return (
        <div className="ayudas-container">
            <h2 className="ayudas-title">Causas para apoyar y donaciones en curso</h2>

            {cargando ? (
                <p className="ayudas-loading">Cargando opciones...</p>
            ) : ayudas.length === 0 ? (
                <p className="ayudas-empty">No hay opciones disponibles.</p>
            ) : (
                <div className="ayudas-grid">
                    {ayudas.map((ayuda) => (
                        <div key={ayuda.id} className="ayuda-card">
                            <h3>{ayuda.nombre}</h3>
                            <p>Fecha de vencimiento: {ayuda.fecha}</p>
                            <p>Monto objetivo: {ayuda.monto}</p>
                            <p>Causa: {ayuda.causa}</p>

                            <div className="ayuda-botones">
                                <button
                                    onClick={() => setAyudaSeleccionado(ayuda)}
                                    className="btn-ver"
                                >
                                    Ver más detalles
                                </button>
                                <button
                                    onClick={() => registrarse(ayuda.id)}
                                    disabled={registrandoAyudaId === ayuda.id}
                                    className="btn-donar"
                                >
                                    {registrandoAyudaId === ayuda.id ? "En curso..." : "Donar"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal
                show={!!ayudaSeleccionado}
                onClose={() => setAyudaSeleccionado(null)}
            >
                {ayudaSeleccionado && (
                    <div>
                        <h2>{ayudaSeleccionado.nombre}</h2>
                        <p>📅 Fecha: {ayudaSeleccionado.fecha}</p>
                        <p>📍 Lugar: {ayudaSeleccionado.lugar}</p>
                        <p>💰 Monto: {ayudaSeleccionado.monto}</p>
                        <p>🎯 Causa: {ayudaSeleccionado.causa}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};


export default AyudasUsuario;
