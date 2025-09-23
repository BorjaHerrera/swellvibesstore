import { useContext } from 'react';

import {
  setQuery,
  resetQuery
} from '../../reducer/SearchReducer/SearchActions';
import { SearchContext } from '../SearchInput/SearchContext';

export const DashboardSearchInput = () => {
  const { state, dispatch } = useContext(SearchContext);
  const { query } = state;

  const handleInput = (e) => {
    setQuery({ dispatch, query: e.target.value });
  };

  return (
    <div className='flex flex-wrap gap-2'>
      <input
        type='text'
        placeholder='Buscar por nombre...'
        value={query}
        onChange={handleInput}
        className='flex-1 min-w-[200px] p-3 rounded bg-white/10 text-white border border-gray-700'
      />
      {query && (
        <button
          onClick={() => resetQuery(dispatch)}
          className='px-4 py-2 rounded bg-gray-600 text-white font-semibold hover:bg-gray-700 transition'
        >
          Limpiar
        </button>
      )}
    </div>
  );
};
