import { useContext, useState } from 'react';
import { FilterContext } from './FilterContext';
import { setSortPrice } from '../../reducer/FilterReducer/FilterActions';

export const SortOptions = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { state, dispatch } = useContext(FilterContext);
  const { selectedSort } = state;

  const handlePriceOrder = (e) => {
    const value = e.target.value;

    if (selectedSort === value) {
      setSortPrice({ dispatch, value: null });
    } else {
      setSortPrice({ dispatch, value });
    }
  };

  return (
    <div className='border-t border-gray-300 py-4 pb-0'>
      <button
        className='flex justify-between items-center w-full font-semibold'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Orden</span>
        <img
          src={
            isOpen ? '/assets/flecha-arriba.png' : '/assets/flecha-abajo.png'
          }
          alt={isOpen ? 'Arriba' : 'Abajo'}
          className='w-4 h-4'
        />
      </button>

      {isOpen && (
        <div className='mt-2 space-y-2'>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              value='asc'
              checked={selectedSort === 'asc'}
              onChange={handlePriceOrder}
              onClick={() => {
                if (selectedSort === 'asc') {
                  setSortPrice({ dispatch, value: null });
                }
              }}
            />
            Precios: De bajo a alto
          </label>
          <label className='flex items-center gap-2'>
            <input
              type='radio'
              value='desc'
              checked={selectedSort === 'desc'}
              onChange={handlePriceOrder}
              onClick={() => {
                if (selectedSort === 'desc') {
                  setSortPrice({ dispatch, value: null });
                }
              }}
            />
            Precios: De alto a bajo
          </label>
        </div>
      )}
    </div>
  );
};
