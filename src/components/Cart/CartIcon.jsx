import { useContext } from 'react';
import { CartContext } from './CartContext';
import { NavLink } from 'react-router-dom';

export const CartIcon = () => {
  const { state } = useContext(CartContext);
  const { totalItems } = state;

  return (
    <NavLink
      to='/cart'
      aria-label='Ir al carrito'
      className='relative inline-flex items-center'
    >
      <img src='/assets/cart.svg' alt='Cart' className='w-5 h-5' />
      {totalItems > 0 && (
        <span className='absolute -top-1 -right-1 bg-teal-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
          {totalItems}
        </span>
      )}
    </NavLink>
  );
};
