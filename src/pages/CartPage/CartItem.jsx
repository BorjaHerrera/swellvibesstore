import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../components/Cart/CartContext';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { getUserAuth } from '../../functions/getUserAuth';
import { API } from '../../utils/API/API';
import {
  addToCart,
  removeFromCart,
  setCart
} from '../../reducer/CartReducer/cartActions';

export const CartItem = ({ item }) => {
  const { state, dispatch, guestCartId, loadingCart } = useContext(CartContext);
  const { setLoading } = useContext(LoadingContext);
  const { cartSource } = state;
  const { userId, token } = getUserAuth();

  // productData seguro
  const productData = item.product || {};

  // Si todavía no está cargado el producto o el precio, no renderizamos
  if (loadingCart || !productData._id || productData.price == null) return null;

  const getCartId = () => (cartSource === 'guest' ? guestCartId : null);

  const updateQuantity = async (newQuantity) => {
    setLoading(true);
    try {
      const cartId = getCartId();
      const productId = productData._id;

      if (cartSource === 'guest') {
        const data = await API({
          method: 'PUT',
          endpoint: `/cart/${cartId}/product/${productId}`,
          body: { quantity: Number(newQuantity) }
        });
        setCart({ dispatch, items: data.items || [], cartSource: 'guest' });
        localStorage.setItem('cart', JSON.stringify(data.items || []));
      } else if (cartSource === 'user' && userId) {
        await API({
          method: 'PUT',
          endpoint: `/${userId}/cart/product/${productId}`,
          body: { quantity: Number(newQuantity) },
          token
        });
        addToCart({ dispatch, item: { ...item, quantity: newQuantity } });
      }
    } catch (err) {
      console.error('Error actualizando cantidad:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => updateQuantity(item.quantity + 1);
  const handleRemove = () =>
    item.quantity > 1 ? updateQuantity(item.quantity - 1) : handleDelete();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const cartId = getCartId();
      const productId = productData._id;

      if (cartSource === 'guest') {
        const data = await API({
          method: 'DELETE',
          endpoint: `/cart/${cartId}/product/${productId}`
        });
        setCart({ dispatch, items: data.items || [], cartSource: 'guest' });
        localStorage.setItem('cart', JSON.stringify(data.items || []));
      } else if (cartSource === 'user' && userId) {
        await API({
          method: 'DELETE',
          endpoint: `/${userId}/cart/product/${productId}`,
          token
        });
        removeFromCart({ dispatch, productId });
      }
    } catch (err) {
      console.error('Error eliminando producto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex gap-4 border-b py-8 px-4 items-start w-full max-[520px]:px-0 max-[520px]:gap-0 max-[520px]:justify-start'>
      {/* Imagen */}
      {productData.image && (
        <img
          src={productData.image}
          alt={productData.name || 'Producto'}
          className='w-40 h-40 object-contain rounded max-[520px]:w-32 h-32'
        />
      )}

      {/* Contenedor principal */}
      <div className='flex flex-1 justify-between w-full max-[1190px]:flex-col-reverse max-[1190px]:items-start '>
        {/* Columna izquierda: h3 + botones cantidad + eliminar */}
        <div className='flex flex-col gap-5 w-full items-start pt-2'>
          <h3 className='text-base font-semibold max-[550px]:font-medium'>
            {productData.section ? (
              <Link
                to={`/productos/${productData.section.slug}/${productData._id}`}
              >
                {productData.name || 'Producto'}
              </Link>
            ) : (
              productData.name || 'Producto'
            )}
          </h3>

          {/* Botones de cantidad */}
          <div className='flex items-center gap-2'>
            <button
              onClick={handleRemove}
              className='px-2 py-1 border rounded hover:bg-gray-100'
            >
              -
            </button>
            <span className='px-3'>{item.quantity}</span>
            <button
              onClick={handleAdd}
              className='px-2 py-1 border rounded hover:bg-gray-100'
            >
              +
            </button>
          </div>

          {/* Botón eliminar debajo */}
          <button
            onClick={handleDelete}
            className='text-rose-800 text-base hover:underline pt-1'
          >
            X Eliminar artículo
          </button>
        </div>

        {/* Columna derecha: precio */}
        <div className='flex flex-col items-end pt-2 max-[1190px]:pb-2'>
          <span className='text-teal-800 font-medium whitespace-nowrap'>
            {productData.price != null
              ? `${productData.price.toFixed(2)} €`
              : '0.00 €'}
          </span>
        </div>
      </div>
    </div>
  );
};
