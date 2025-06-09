import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth-token');

      await axios.post('/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('auth-token'); // Limpiar token
      navigate('/login'); // Redirigir al login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="text-red-500">
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
