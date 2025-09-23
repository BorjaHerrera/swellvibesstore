import { useContext, useEffect, useState } from 'react';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { API } from '../../utils/API/API';

export const ProductFetch = ({ section, id, children }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API({
          method: 'GET',
          endpoint: `/productos/${section}/${id}`
        });
        setProduct(res);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (section && id) {
      fetchProduct();
    }
  }, [section, id, setLoading]);

  return children({ product, error });
};
