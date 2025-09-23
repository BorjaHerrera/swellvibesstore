import { useContext, useEffect, useState } from 'react';
import { API } from '../../utils/API/API';
import { FilterContext } from '../../components/Filter/FilterContext';
import { setAvailableFilters } from '../../reducer/FilterReducer/FilterActions';
import { LoadingContext } from '../../components/Loading/LoadingContext';

export const ProductsFetch = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const { state, dispatch } = useContext(FilterContext);
  const { filters, selectedSort, section } = state;
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const paramsProducts = new URLSearchParams();

        if (section?.trim()) {
          paramsProducts.append('section', section);
        }

        Object.entries(filters).forEach(([key, values]) => {
          if (Array.isArray(values)) {
            values.forEach((value) => {
              if (value?.trim()) {
                paramsProducts.append(key, value);
              }
            });
          }
        });

        if (selectedSort?.trim()) {
          paramsProducts.append('sortPrice', selectedSort);
        }

        const productsEndpoint = `/productos?${paramsProducts.toString()}`;
        const productsData = await API({
          method: 'GET',
          endpoint: productsEndpoint
        });

        setProducts(productsData || []);

        if (section?.trim()) {
          const paramsFilters = new URLSearchParams();
          paramsFilters.append('section', section);

          const filtersData = await API({
            method: 'GET',
            endpoint: `/categorias/filtradas?${paramsFilters.toString()}`
          });

          const cleanedFilters = filtersData?.filters
            ? Object.fromEntries(
                Object.entries(filtersData.filters).filter(
                  ([key]) => key !== 'filters' && key !== 'filterKey'
                )
              )
            : {};

          setAvailableFilters({ dispatch, availableFilters: cleanedFilters });
        } else {
          setAvailableFilters({ dispatch, availableFilters: {} });
        }

        setError(null);
      } catch (err) {
        setError(err.message || 'Error cargando productos y filtros');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, selectedSort, section, dispatch, setLoading]);

  return children({ products, error });
};
