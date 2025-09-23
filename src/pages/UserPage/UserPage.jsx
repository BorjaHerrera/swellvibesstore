import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { API } from '../../utils/API/API';
import { Form } from '../../components/Form/Form';
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const { user, logout, token, login } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const showMessage = (text, isError = false) => {
    setMessage(text);
    setError(isError);
    setTimeout(() => setMessage(''), 1000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      const result = await API({
        endpoint: `/usuarios/${user._id}`,
        method: 'PUT',
        body: data,
        token
      });
      login(result.user, token);
      showMessage('Datos actualizados correctamente', false);
      return result;
    } catch (err) {
      console.error(err);
      showMessage('Hubo un error al actualizar los datos', true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (
      !window.confirm(
        '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.'
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      const result = await API({
        endpoint: `/usuarios/${user._id}`,
        method: 'DELETE',
        token
      });

      console.log(result); // opcional, para depurar

      // cerrar sesión y redirigir al home
      logout();
      navigate('/');
      alert('Tu cuenta ha sido eliminada correctamente');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al eliminar tu cuenta');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className='min-h-screen bg-cyan-700 flex flex-col items-center px-8 pt-24'>
      <h1 className='text-4xl font-bold text-white text-center mb-6 pb-6'>
        Mi Cuenta
      </h1>

      <div className='w-full max-w-md flex flex-col gap-6 pl-6'>
        <h2 className='text-2xl font-semibold text-white'>Perfil</h2>

        <Form
          fields={['name', 'surname', 'gender', 'email']}
          readOnlyFields={['email']}
          defaultValues={{
            name: user.name,
            surname: user.surname,
            gender: user.gender,
            email: user.email
          }}
          onSubmit={handleUpdate}
          submitLabel='GUARDAR CAMBIOS'
        />

        {message && (
          <p
            className={`font-semibold ${
              error ? 'text-rose-300' : 'text-green-400'
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleLogout}
          className='w-full bg-white text-sky-900 font-semibold py-2 px-4 rounded hover:bg-pink-700 hover:text-white transition mt-4'
        >
          CERRAR SESIÓN
        </button>

        {/* Botón eliminar cuenta */}
        <button
          onClick={handleDeleteUser}
          className='w-full bg-pink-700 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition mt-2'
        >
          ELIMINAR CUENTA
        </button>
      </div>
    </div>
  );
};
