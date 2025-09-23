import { useState, useContext } from 'react';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { ProductForm } from '../../components/ProductsForm/ProductForm';
import { useCategories } from '../../hooks/useCategories';
import { API } from '../../utils/API/API';

export const CreateProduct = () => {
  const { setLoading } = useContext(LoadingContext);
  const [message, setMessage] = useState('');
  const [loading, setLocalLoading] = useState(false);

  const categories = useCategories();

  const onSubmit = async (formData) => {
    setLoading(true);
    setLocalLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image' && value.length > 0) {
          data.append('image', value[0]);
        } else {
          data.append(key, value);
        }
      });

      await API({
        endpoint: '/productos',
        method: 'POST',
        body: data,
        token: localStorage.getItem('token')
      });

      setMessage('Producto creado correctamente ✅');
    } catch (err) {
      console.error(err);
      setMessage('Error al crear el producto ❌');
    } finally {
      setLoading(false);
      setLocalLoading(false);
    }
  };

  return (
    <ProductForm
      title='Crear Producto'
      mode='create'
      categories={categories}
      onSubmit={onSubmit}
      loading={loading}
      message={message}
    />
  );
};
