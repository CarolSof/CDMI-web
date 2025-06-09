// utils/logoutConfirmado.js
export function confirmarLogout(navigate) {
  const confirmacion = window.confirm("¿Estás segura de que quieres cerrar sesión?");
  if (confirmacion) {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("rol");
    navigate("/login");
  }
}
