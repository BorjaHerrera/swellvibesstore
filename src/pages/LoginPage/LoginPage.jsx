import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { API } from '../../utils/API/API';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { LoadingContext } from '../../components/Loading/LoadingContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleLogin = async (data, setError) => {
    try {
      setLoading(true);

      const result = await API({
        endpoint: '/usuarios/login',
        method: 'POST',
        body: {
          email: data.email,
          password: data.password
        }
      });

      login(result.user, result.token);
      if (result.user.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate(`/usuarios/${result.user._id}`);
      }
      return true;
    } catch (error) {
      if (error.details?.errorType === 'INVALID_PASSWORD_OR_USER') {
        setError('email', {
          type: 'manual',
          message: 'Usuario o contraseña incorrectos. Pruebe de nuevo'
        });
      } else {
        setError('email', {
          type: 'manual',
          message: 'Hubo un error al iniciar sesión'
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-cyan-700 flex items-start justify-center px-4 pt-24'>
      <div className='w-full max-w-md flex flex-col gap-6'>
        <Form
          title='INICIAR SESIÓN'
          fields={['email', 'password']}
          onSubmit={handleLogin}
          submitLabel='INICIAR SESIÓN'
        />

        {/* Separador */}
        <div className='flex items-center justify-center gap-4 mt-6'>
          <hr className='flex-1 border-t border-white' />
          <span className='text-white font-semibold'>o</span>
          <hr className='flex-1 border-t border-white' />
        </div>

        {/* Botón Registro */}
        <button
          onClick={() => navigate('/usuarios/registro')}
          className='w-full bg-white text-sky-900 font-semibold py-2 px-4 rounded hover:bg-pink-700 hover:text-white transition mt-4 border border-rose-300'
        >
          REGÍSTRATE
        </button>
      </div>
    </div>
  );
};
