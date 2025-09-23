import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

export const ProductForm = ({
  title,
  onSubmit,
  categories = [],
  defaultValues = {},
  mode = 'create',
  loading,
  message
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({ defaultValues });

  const [preview, setPreview] = useState('');

  // Rellenar campos al editar
  useEffect(() => {
    if (mode === 'edit' && defaultValues) {
      setValue('name', defaultValues.name || '');
      setValue('brand', defaultValues.brand || '');
      setValue('style', defaultValues.style || '');
      setValue('description', defaultValues.description || '');
      setValue('price', defaultValues.price || '');
      setValue('gender', defaultValues.gender || '');
      setValue('section', defaultValues.section || '');
      // Imagen: si existe, poner URL de Cloudinary
      setPreview(defaultValues.image || '');
    }
  }, [defaultValues, mode, setValue]);

  const watchImage = watch('image');

  // Generar preview cuando seleccionan una nueva imagen
  useEffect(() => {
    if (watchImage && watchImage.length > 0) {
      const file = watchImage[0];

      // Solo si es realmente un File nuevo (no un string de Cloudinary)
      if (file instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }, [watchImage]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full my-8 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white'
    >
      {title && (
        <h2 className='text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'>
          {title}
        </h2>
      )}

      {/* Imagen preview */}
      {preview && (
        <div className='mb-3'>
          <img
            src={preview}
            alt='Preview'
            className='w-32 h-32 object-cover rounded-md'
          />
        </div>
      )}

      {/* Categoría */}
      <select
        {...register('section', { required: 'Selecciona una categoría' })}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      >
        <option value=''>-- Selecciona categoría --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id} className='text-black'>
            {cat.name}
          </option>
        ))}
      </select>
      {errors.section && (
        <p className='text-red-400 mb-2'>{errors.section.message}</p>
      )}

      {/* Nombre */}
      <input
        type='text'
        placeholder='Nombre'
        {...register('name', { required: 'Nombre obligatorio' })}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      />
      {errors.name && (
        <p className='text-red-400 mb-2'>{errors.name.message}</p>
      )}

      {/* Marca */}
      <input
        type='text'
        placeholder='Marca'
        {...register('brand', { required: 'Marca obligatoria' })}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      />
      {errors.brand && (
        <p className='text-red-400 mb-2'>{errors.brand.message}</p>
      )}

      {/* Estilo */}
      <input
        type='text'
        placeholder='Estilo'
        {...register('style')}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      />

      {/* Descripción */}
      <textarea
        placeholder='Descripción'
        {...register('description', { required: 'Descripción obligatoria' })}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white resize-none'
        rows={3}
      />
      {errors.description && (
        <p className='text-red-400 mb-2'>{errors.description.message}</p>
      )}

      {/* Precio */}
      <input
        type='number'
        step='0.01'
        placeholder='Precio'
        {...register('price', { required: 'Precio obligatorio' })}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      />
      {errors.price && (
        <p className='text-red-400 mb-2'>{errors.price.message}</p>
      )}

      {/* Género */}
      <select
        {...register('gender')}
        className='w-full mb-3 p-3 rounded bg-white/10 border border-gray-700 text-white'
      >
        <option key='gender-default' value=''>
          -- Selecciona género --
        </option>
        <option key='gender-woman' value='Woman' className='text-black'>
          Woman
        </option>
        <option key='gender-man' value='Man' className='text-black'>
          Man
        </option>
      </select>

      {/* Imagen */}
      <input
        type='file'
        {...register('image')}
        className='w-full mb-3 text-white'
      />

      <button
        type='submit'
        disabled={loading}
        className='w-full py-2 px-4 rounded bg-gradient-to-r from-violet-600 to-purple-700 font-semibold hover:opacity-90 transition'
      >
        {mode === 'create' ? 'SUBIR PRODUCTO' : 'GUARDAR CAMBIOS'}
      </button>

      {message && <p className='mt-3 text-center text-white'>{message}</p>}
    </form>
  );
};
