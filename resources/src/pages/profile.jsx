{/*import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  async function fetchProfile() {
    const token = localStorage.getItem("auth-token");
  try {
    const res = await fetch("/api/perfil?nocache=" + new Date().getTime(), {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Error al cargar el perfil");
    }

    const data = await res.json();
    console.log("Perfil recibido:", data);

    const userData = {
      nombre: data.nombre || "",
      apellido: data.apellido || "",
      correo: data.correo || data.email || "",
      telefono: data.telefono || "",
      imagen_perfil: data.imagen_perfil || null,
    };

    setUser(userData);
    setForm({
      nombre: userData.nombre,
      apellido: userData.apellido,
      correo: userData.correo,
      telefono: userData.telefono,
      imagen_perfil: null,
      contraseña: "",
    });
  } catch (error) {
    console.error("Fallo al obtener perfil:", error);
    alert("Ocurrió un error al cargar tu perfil. Intenta iniciar sesión nuevamente.");
  }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm((f) => ({ ...f, imagen_perfil: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    const token = localStorage.getItem("auth-token");
    const formData = new FormData();

    formData.append("nombre", form.nombre);
    formData.append("apellido", form.apellido);
    formData.append("correo", form.correo);
    formData.append("telefono", form.telefono);

    if (form.contraseña) {
      formData.append("contraseña", form.contraseña);
    }

    if (form.imagen_perfil instanceof File) {
      formData.append("imagen_perfil", form.imagen_perfil);
    }

    const res = await fetch("/api/perfil", {
      method: "PUT",
      headers: { 
        Authorization: `Bearer ${token}`, 
    },
      body: formData,
    });

    const data = await res.json(); // Captura respuesta
     //console.log("Respuesta del backend tras PUT /api/perfil:", data);

    if (res.ok) {
        alert("Perfil actualizado con éxito");
        await fetchProfile();
  setEditMode(false);
  setPreview(null);
   // Re-cargar perfil limpio y actualizado
} else {
  alert("Error al actualizar perfil");
    }
    setSaving(false);
  };

  if (!user) return <div>Cargando perfil...</div>;

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      {!editMode ? (
        <div>
          <img
            src={
              user.imagen_perfil
                ? `/storage/perfiles/${user.imagen_perfil}?${new Date().getTime()}`
                : "https://i.pravatar.cc/150"
            }
            alt="Avatar"
            style={{ width: 150, borderRadius: "50%" }}
          />
          <h2>
            {user.nombre} {user.apellido}
          </h2>
          <p>{user.correo || user.email}</p>
          <p>{user.telefono}</p>
          <button onClick={() => setEditMode(true)}>Editar perfil</button>
        </div>
      ) : (
        <div>
          <label>
            Nombre:
            <br />
            <input
              name="nombre"
              value={form.nombre || ""}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Apellido:
            <br />
            <input
              name="apellido"
              value={form.apellido || ""}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Correo:
            <br />
            <input
              name="correo"
              type="email"
              value={form.correo || ""}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Teléfono:
            <br />
            <input
              name="telefono"
              value={form.telefono || ""}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <br />
            <input
              name="contraseña"
              type="password"
              value={form.contraseña || ""}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Imagen de perfil:
            <br />
            <input type="file" accept="image/*" onChange={handleFile} />
          </label>
          <br />
          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: 100, borderRadius: "50%", marginTop: 10 }}
            />
          )}
          <br />
          <button onClick={handleSave} disabled={saving}>
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={() => {
              setEditMode(false);
              setPreview(null);
              setForm({
                nombre: user.nombre,
                apellido: user.apellido,
                correo: user.correo || user.email,
                telefono: user.telefono || "",
                imagen_perfil: null,
                contraseña: "",
              });
            }}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}*/}



{/*import React, { useState } from "react";
import useGetSession from "../hooks/useGetSession";

export default function Profile() {
    const { userSession, loading, refreshSession } = useGetSession();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);

    if (loading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        setFormData(userSession);
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        setFormData({});
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`/api/usuarios/${userSession.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                let errores = "Errores en la actualización:\n";
                for (const campo in result.errors) {
                    errores += `- ${campo}: ${result.errors[campo].join(", ")}\n`;
                }
                alert(errores);
                return;
            }

            //Éxito
            alert("Perfil actualizado exitosamente.");
            setEditMode(false);
            setFormData({});
            if (typeof refreshSession === "function") {
                await refreshSession(); // Esperamos a que se recargue antes de continuar
            } 
        }catch (error) {
            console.error("Error inesperado", error);
            alert("Error al actualizar el perfil.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="p-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Perfil de Usuario</h1>
                        {!editMode ? (
                            <>
                                <p><strong>Nombre:</strong> {userSession.nombre} {userSession.apellido}</p>
                                <p><strong>Correo:</strong> {userSession.correo}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {userSession.fecha_nacimiento}</p>
                                <p><strong>Teléfono:</strong> {userSession.telefono}</p>
                                <p><strong>Rol:</strong> {userSession.rol}</p>

                                <button className="btn btn-primary mt-3" onClick={handleEdit}>
                                    Editar Perfil
                                </button>
                            </>
                        ) : (
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="mb-2">
                                    <label>Nombre:</label>
                                    <input
                                        name="nombre"
                                        className="form-control"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Apellido:</label>
                                    <input
                                        name="apellido"
                                        className="form-control"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Correo:</label>
                                    <input
                                        name="correo"
                                        type="email"
                                        className="form-control"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Teléfono:</label>
                                    <input
                                        name="telefono"
                                        className="form-control"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label>Fecha de nacimiento:</label>
                                    <input
                                        name="fecha_nacimiento"
                                        type="date"
                                        className="form-control"
                                        value={formData.fecha_nacimiento}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="mt-3">
                                    <button className="btn btn-success me-2" onClick={handleSave} disabled={saving}>
                                        {saving ? "Guardando..." : "Guardar cambios"}
                                    </button>
                                    <button className="btn btn-secondary" onClick={handleCancel}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}*/}
{/*import React from "react";
import useGetSession from "../hooks/useGetSession";

export default function Profile() {
    const { userSession, loading } = useGetSession();

    if (loading) {
        return <div className="text-center text-gray-500">Cargando...</div>;
    }

    return (
        <section className="p-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Perfil de Usuario</h1>
                        <p>
                            <strong>Nombre:</strong> {userSession.nombre}{" "}
                            {userSession.apellido}
                        </p>
                        <p>
                            <strong>Correo:</strong> {userSession.correo}
                        </p>
                        <p>
                            <strong>Fecha de Nacimiento:</strong>{" "}
                            {userSession.fecha_nacimiento}
                        </p>
                        <p>
                            <strong>Teléfono:</strong> {userSession.telefono}
                        </p>
                        <p>
                            <strong>Rol:</strong> {userSession.rol}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
*/}