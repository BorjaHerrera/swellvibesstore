import { useNavigate } from 'react-router-dom';
import { Form } from '../../components/Form/Form';
import { API } from '../../utils/API/API';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';
import { LoadingContext } from '../../components/Loading/LoadingContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { setLoading } = useContext(LoadingContext);

  const handleRegister = async (data, setError) => {
    try {
      setLoading(true);

      const result = await API({
        endpoint: '/usuarios/registro',
        method: 'POST',
        body: {
          name: data.name,
          surname: data.surname,
          gender: data.gender,
          email: data.email,
          password: data.password
        }
      });

      login(result.user, result.token);
      navigate(`/usuarios/${result.user._id}`);
      return true;
    } catch (error) {
      if (error.details?.errorType === 'DUPLICATED_EMAIL') {
        setError('email', {
          type: 'manual',
          message: 'Este correo ya está registrado'
        });
      } else {
        setError('email', {
          type: 'manual',
          message: 'Hubo un error al registrar el usuario'
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-cyan-700 flex items-start justify-center px-4 pt-24'>
      <div className='w-full max-w-lg px-4'>
        <Form
          title='REGISTRO'
          fields={['name', 'surname', 'gender', 'email', 'password']}
          onSubmit={handleRegister}
          submitLabel='REGISTRARSE'
        />
      </div>
    </div>
  );
};
