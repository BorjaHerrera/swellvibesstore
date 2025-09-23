import { useContext } from 'react';
import { FilterContext } from './FilterContext';
import { Filter } from './Filter';
import { SortOptions } from './sortOptions';
import {
  filterIsOpen,
  resetFilters
} from '../../reducer/FilterReducer/FilterActions';

export const FilterPanel = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { isOpen } = state;

  return (
    <aside
      id='filter-aside'
      className={`fixed top-8 left-2 z-30 bg-white transition-all duration-300 overflow-hidden
    ${
      isOpen
        ? `mt-28 w-96 h-[calc(100vh-64px)] 
         max-[1000px]:left-0 
         max-[1000px]:w-full 
         max-[1000px]:top-16 
         max-[1000px]:mt-0 
         overflow-y-auto pr-2 pb-16 
         scrollbar-thin scrollbar-thumb-teal-800 scrollbar-track-gray-200 opacity-100`
        : 'opacity-0 w-0 h-0 overflow-hidden'
    }
`}
    >
      <div className='p-4 space-y-4'>
        <SortOptions />
        <Filter />

        {/* Botones responsive */}
        <div className='hidden max-[1000px]:filter-buttons-responsive'>
          <button
            className='bg-gray-200 text-gray-700 px-4 py-2 rounded w-full'
            onClick={() => {
              resetFilters(dispatch);
            }}
          >
            Borrar
          </button>
          <button
            className='bg-teal-800 text-white px-4 py-2 rounded w-full'
            onClick={() => {
              filterIsOpen(dispatch);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </aside>
  );
};
