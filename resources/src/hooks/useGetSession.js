import { useState, useEffect } from "react";

export default function useGetSession() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(false);

    const handleLogout = async () => {
        const confirmLogout = window.confirm("¿Seguro que desea cerrar sesión?");
        if (!confirmLogout) return;
        
        const token = localStorage.getItem("auth-token");

        const response = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const result = await response.json();

        if (!response.ok) {
            alert("Error al cerrar sesion");
            console.log(result);
            return;
        }

        alert("Sesion cerrada exitosamente");
        localStorage.removeItem("auth-token");
        window.location.href = "/";
    };

    useEffect(() => {
        const token = localStorage.getItem("auth-token");

        if (!token) {
            setError("No hay token disponible");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await fetch("/api/verify", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error);
                    setLoading(false);
                    return;
                }

                setData({ ...data.user, token });
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUser();
    }, [trigger]);

    const reload = () => setTrigger(!trigger);

    return { userSession: data, loading, error, reload, handleLogout };
}
