import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("auth-token");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/perfil", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({
          ...res.data,
          contraseña: "",
      });
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, imagen_perfil: file });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
  setLoading(true);

  console.log("📦 Lo que estás a punto de enviar (form):", form);

  const formData = new FormData();

  // Campos normales
  if (form.nombre) formData.append("nombre", form.nombre);
  if (form.apellido) formData.append("apellido", form.apellido);
  if (form.correo) formData.append("correo", form.correo);
  if (form.telefono) formData.append("telefono", form.telefono);

  // Contraseña si se ingresó
  if (form.contraseña) formData.append("contraseña", form.contraseña);

  // Imagen si se subió
  if (form.imagen_perfil instanceof File) {
    formData.append("imagen_perfil", form.imagen_perfil);
  }

  // DEBUG: Mostrar contenido de formData
  for (let [key, value] of formData.entries()) {
    console.log(`🧾 ${key}:`, value);
  }

  try {
    const res = await axios.post("http://localhost:8000/api/perfil?_method=PUT", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Respuesta:", res.data);
    alert("Perfil actualizado correctamente");
    setUser(res.data);
    setEditMode(false);
    setPreview(null);
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    alert("Ocurrió un error al actualizar el perfil");
  } finally {
    setLoading(false);
  }
  };

  if (!user) return <p className="text-center mt-10">Cargando perfil...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <div className="flex flex-col items-center">
        <img
          src={
            preview
              ? preview
              : user.imagen_perfil
              ? `http://localhost:8000/storage/perfiles/${user.imagen_perfil}`
              : "https://via.placeholder.com/150"
          }
          alt="Perfil"
          className="w-32 h-32 object-cover rounded-full mb-4"
        />
        {!editMode && (
          <>
            <h2 className="text-2xl font-bold mb-2">
              {user.nombre} {user.apellido}
            </h2>
            <p className="text-gray-700 mb-1"><strong>Correo:</strong> {user.correo}</p>
            <p className="text-gray-700 mb-1"><strong>Teléfono:</strong> {user.telefono}</p>
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Editar perfil
            </button>
          </>
        )}
      </div>

      {editMode && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6" encType="multipart/form-data">
          <div>
            <label className="block font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={form.apellido || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Contraseña (opcional)</label>
            <input
              type="password"
              name="contraseña"
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Imagen de perfil</label>
            <input
              type="file"
              name="imagen_perfil"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditMode(false);
                setForm(user);
                setPreview(null);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
