import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { API } from '../../utils/API/API';
import { LoadingContext } from '../Loading/LoadingContext';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export const CategoryForm = () => {
  const { setLoading } = useContext(LoadingContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLocalLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: { name: '' }
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setValue('name', selectedCategory.name);
    }
  }, [selectedCategory, setValue]);

  const fetchCategories = async () => {
    try {
      const data = await API({ endpoint: '/categorias', method: 'GET' });
      setCategories(data);
    } catch (err) {
      console.error('Error cargando categorías:', err);
    }
  };

  const handleCreate = async (formData) => {
    setLoading(true);
    setLocalLoading(true);
    try {
      await API({
        endpoint: '/categorias',
        method: 'POST',
        body: { name: formData.name },
        token: localStorage.getItem('token')
      });
      setMessage('Categoría creada correctamente');
      fetchCategories();
      reset();
    } catch (err) {
      console.error(err);
      setMessage('Error al crear la categoría');
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  const handleEdit = async (formData) => {
    if (!selectedCategory) return;
    setLoading(true);
    setLocalLoading(true);
    try {
      await API({
        endpoint: `/categorias/${selectedCategory._id}`,
        method: 'PUT',
        body: { name: formData.name },
        token: localStorage.getItem('token')
      });
      setMessage('Categoría actualizada correctamente');
      setSelectedCategory(null);
      fetchCategories();
      reset();
    } catch (err) {
      console.error(err);
      setMessage('Error al actualizar la categoría');
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    setLocalLoading(true);
    try {
      await API({
        endpoint: `/categorias/${id}`,
        method: 'DELETE',
        token: localStorage.getItem('token')
      });
      setMessage('Categoría eliminada correctamente');
      fetchCategories();
    } catch (err) {
      console.error(err);
      setMessage('Error al eliminar la categoría');
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  return (
    <div className='w-full my-8 p-6 rounded-lg shadow-lg bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#1e3a8a] text-white'>
      <h2 className='inline-block text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-left'>
        Gestionar Categorías
      </h2>

      <form
        onSubmit={handleSubmit(selectedCategory ? handleEdit : handleCreate)}
        className='mb-6'
      >
        <input
          type='text'
          placeholder='Nombre de la categoría'
          {...register('name', { required: 'Nombre obligatorio' })}
          className={`w-full mb-3 p-3 rounded bg-white/10 text-white border ${
            selectedCategory
              ? 'border-pink-500 border-2 animate-pulse'
              : 'border-gray-700'
          }`}
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full py-2 px-4 rounded bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold hover:opacity-90 transition'
        >
          {selectedCategory ? 'GUARDAR CAMBIOS' : 'CREAR CATEGORÍA'}
        </button>
      </form>

      <ul className='space-y-3'>
        {categories.map((cat) => (
          <li
            key={cat._id}
            className='flex items-center justify-between bg-white/10 p-3 rounded'
          >
            <span>{cat.name}</span>
            <div className='flex gap-2'>
              <div className='p-[2px] rounded bg-fuchsia-700'>
                <button
                  className='px-3 py-1 rounded bg-sky-800 hover:bg-sky-900 text-white font-semibold transition w-full'
                  onClick={() => setSelectedCategory(cat)}
                >
                  Editar
                </button>
              </div>
              <div className='p-[2px] rounded bg-cyan-700'>
                <button
                  className='px-3 py-1 rounded bg-pink-700 hover:bg-pink-800 text-white font-semibold transition w-full'
                  onClick={() => setCategoryToDelete(cat)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmModal
        isOpen={!!categoryToDelete}
        title='Eliminar categoría'
        message={`¿Seguro que quieres eliminar la categoría "${categoryToDelete?.name}"?`}
        onCancel={() => setCategoryToDelete(null)}
        onConfirm={async () => {
          await handleDelete(categoryToDelete._id);
          setCategoryToDelete(null);
        }}
      />

      {message && <p className='mt-3 text-center'>{message}</p>}
    </div>
  );
};
