import { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import { addToCart } from '../../reducer/CartReducer/cartActions';

export const AddToCartButton = ({ product }) => {
  const { dispatch, addProductToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (addProductToCart) {
      addProductToCart(product, 1);
    } else {
      // Fallback: solo actualiza el estado local si no existe la función
      addToCart({ dispatch, item: product });
    }
  };

  return (
    <button
      className='mt-4 bg-teal-700 text-white px-16 py-3 rounded hover:bg-teal-800 transition-colors max-[1000px]:w-full'
      onClick={handleAddToCart}
    >
      Añade al carrito
    </button>
  );
};
