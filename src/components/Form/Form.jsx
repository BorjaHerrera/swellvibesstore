import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { LoadingContext } from '../../components/Loading/LoadingContext';

export const Form = ({
  fields = [],
  onSubmit,
  submitLabel = 'Enviar',
  title,
  readOnlyFields = [],
  defaultValues = {}
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors
  } = useForm({ defaultValues });

  const { setLoading } = useContext(LoadingContext);
  const [showPassword, setShowPassword] = useState(false);

  const internalSubmit = async (data) => {
    try {
      setLoading(true);

      if (data.email) data.email = data.email.trim().toLowerCase();

      const result = await onSubmit(data, setError);

      if (result?.token && result?.user) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        reset();
      }

      return result;
    } catch (err) {
      console.error('Error en el submit del Form:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    name: 'Nombre',
    surname: 'Apellido',
    gender: 'Género',
    email: 'Email',
    password: 'Contraseña'
  };

  const inputClasses =
    'w-full px-3 py-2 rounded bg-white text-black border-b border-teal-500 focus:outline-none';

  return (
    <form
      onSubmit={handleSubmit(internalSubmit)}
      className='w-full max-w-md flex flex-col gap-6'
    >
      {title && (
        <h1 className='text-3xl font-bold text-white text-left pb-2'>
          {title}
        </h1>
      )}

      {fields.map((field) => (
        <div key={field} className='flex flex-col gap-2'>
          <label className='text-white text-sm font-medium'>
            {labels[field]}
          </label>

          {field === 'gender' ? (
            <select
              {...register('gender', { required: 'Selecciona un género' })}
              disabled={readOnlyFields.includes('gender')}
              className={`${inputClasses} ${
                readOnlyFields.includes('gender')
                  ? 'bg-gray-100 cursor-not-allowed'
                  : ''
              }`}
            >
              <option value=''>-- Selecciona --</option>
              <option value='Hombre'>Hombre</option>
              <option value='Mujer'>Mujer</option>
              <option value='Prefiero no responder'>
                Prefiero no responder
              </option>
            </select>
          ) : field === 'password' ? (
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener al menos 6 caracteres'
                  }
                })}
                readOnly={readOnlyFields.includes('password')}
                className={`${inputClasses} pr-10 ${
                  readOnlyFields.includes('password')
                    ? 'bg-gray-100 cursor-not-allowed'
                    : ''
                }`}
              />
              {!readOnlyFields.includes('password') && (
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-2 top-1/2 -translate-y-1/2'
                >
                  <img
                    src={
                      showPassword
                        ? '/assets/open-eye.png'
                        : '/assets/close-eye.png'
                    }
                    alt={
                      showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                    }
                    className='w-5 h-5'
                  />
                </button>
              )}
            </div>
          ) : (
            <input
              type='text'
              {...register(field, {
                required: `El ${labels[field].toLowerCase()} es obligatorio`,
                ...(field === 'email' && {
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: 'Formato de correo no válido'
                  }
                })
              })}
              onChange={() => clearErrors(field)}
              readOnly={readOnlyFields.includes(field)}
              className={`${inputClasses} ${
                readOnlyFields.includes(field)
                  ? 'bg-gray-100 cursor-not-allowed'
                  : ''
              }`}
              defaultValue={defaultValues[field] || ''}
            />
          )}

          {errors[field] && (
            <p className='text-rose-300 text-sm font-semibold'>
              {errors[field].message}
            </p>
          )}
        </div>
      ))}

      <button
        type='submit'
        className='bg-sky-900 text-white text-lg font-semibold py-2 px-4 rounded hover:bg-pink-700 transition'
      >
        {submitLabel}
      </button>
    </form>
  );
};
