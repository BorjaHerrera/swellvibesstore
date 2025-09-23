import { useState, useEffect } from 'react';
import { API } from '../utils/API/API';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await API({ endpoint: '/categorias', method: 'GET' });
        setCategories(data);
      } catch (err) {
        console.error('Error cargando categorías:', err);
      }
    };
    fetchCategories();
  }, []);

  return categories;
};
