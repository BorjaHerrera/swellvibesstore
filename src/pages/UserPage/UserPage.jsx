import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { API } from '../../utils/API/API';
import { Form } from '../../components/Form/Form';
import { useNavigate } from 'react-router-dom';
import { DeleteAccountButton } from '../../components/buttons/DeleteAccountButton';
import { LogoutButton } from '../../components/buttons/LogoutButton';

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
    try {
      setLoading(true);

      await API({
        endpoint: `/usuarios/${user._id}`,
        method: 'DELETE',
        token
      });

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

        {/* Cerrar sesión */}
        <LogoutButton />

        {/* Eliminar cuenta*/}
        <DeleteAccountButton onDelete={handleDeleteUser} />
      </div>
    </div>
  );
};
