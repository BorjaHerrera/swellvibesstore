import { useContext, useRef, useEffect } from 'react';
import { SearchContext } from './SearchContext';
import {
  openInput,
  resetQuery,
  setQuery,
  closeInput
} from '../../reducer/SearchReducer/SearchActions';
import { Logo } from '../Logo/Logo';
import { SearchResults } from './SearchResults';

export const SearchInput = () => {
  const { state, dispatch } = useContext(SearchContext);
  const { isOpen, query } = state;
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleInput = (e) => {
    setQuery({ dispatch, query: e.target.value });
  };

  return (
    <div className='relative z-50'>
      {!isOpen ? (
        <button
          type='button'
          onClick={() => openInput(dispatch)}
          aria-label='Abrir buscador'
        >
          <img src='/assets/search.svg' alt='Buscar' className='w-5 h-5 mt-2' />
        </button>
      ) : (
        <div className='fixed top-0 left-0 w-full bg-white shadow-md z-50 px-16 py-4 flex flex-col gap-4'>
          <div className='flex flex-row items-center justify-between gap-4'>
            <div className='hidden min-[901px]:flex'>
              <Logo />
            </div>

            <div className='relative w-2/3 max-[900px]:w-full'>
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={handleInput}
                placeholder='Buscar'
                className='w-full text-l py-2 px-6 pr-10 border border-gray-50 bg-gray-100 rounded-md focus:outline-none'
              />
              {query && (
                <button
                  onClick={() => resetQuery(dispatch)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-2xl'
                  aria-label='Limpiar búsqueda'
                >
                  ×
                </button>
              )}
            </div>

            <button
              onClick={() => closeInput(dispatch)}
              className='text-l hover:text-gray-400'
            >
              Cancelar
            </button>
          </div>

          <div className='overflow-y-auto max-h-[70vh]'>
            <SearchResults />
          </div>
        </div>
      )}
    </div>
  );
};
