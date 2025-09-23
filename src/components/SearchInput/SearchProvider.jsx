import { useEffect, useReducer, useRef } from 'react';
import { SearchContext } from './SearchContext';

import {
  SEARCH_INITIAL_STATE,
  searchReducer
} from '../../reducer/SearchReducer/SearchReducer';
import {
  resetQuery,
  setResults
} from '../../reducer/SearchReducer/SearchActions';
import { API } from '../../utils/API/API';

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, SEARCH_INITIAL_STATE);
  const { query } = state;

  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (!query) {
      resetQuery(dispatch);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      API({ endpoint: `/productos?name=${encodeURIComponent(query)}` })
        .then((data) => {
          setResults({ dispatch, results: data });
        })
        .catch((error) => console.error('Error al buscar productos:', error));
    }, 400);

    // Cleanup para limpiar timeout si query cambia rápido
    return () => clearTimeout(debounceTimeout.current);
  }, [query, dispatch]);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
