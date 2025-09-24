import { useNavigate } from 'react-router-dom';

export const LogoutButton = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className={`w-full bg-white text-sky-900 font-semibold py-2 px-4 rounded 
                    hover:bg-pink-700 hover:text-white transition mt-4 ${className}`}
    >
      CERRAR SESIÓN
    </button>
  );
};
