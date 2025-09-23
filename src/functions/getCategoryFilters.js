import { API } from '../utils/API/API';

export const getCategoryFilters = async (section) => {
  const data = await API({
    endpoint: `/categorias/filtradas?section=${encodeURIComponent(section)}`,
    method: 'GET'
  });

  return data;
};
