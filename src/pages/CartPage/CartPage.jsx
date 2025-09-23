import { useContext } from 'react';
import { CartContext } from '../../components/Cart/CartContext';
import { CartItem } from './CartItem';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { RelatedProducts } from '../../components/RelatedProducts/RelatedProducts';

export const CartPage = () => {
  const { state } = useContext(CartContext);
  const { items, totalPrice } = state;

  return (
    <>
      <div className='mx-[2%] pt-10 pl-2 pr-2  '>
        {/* Título y línea */}
        <h1 className='text-2xl font-bold mb-6'>Mi Cesta</h1>
        <hr className='border-t border-gray-300 mb-8 w-full' />

        <div className='flex flex-row gap-16 max-[900px]:flex-col '>
          {/* Lista de productos*/}
          <div className='flex flex-col gap-4  w-2/3 max-[1290px]:w-3/5 max-[1190px]:w-[55%] max-[900px]:w-full '>
            {items.length === 0 ? (
              <div className='flex items-center justify-center h-64'>
                <p className='text-lg font-medium'>
                  NO HAY ARTÍCULOS EN TU CESTA
                </p>
              </div>
            ) : (
              items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))
            )}
          </div>

          {/* Resumen del pedido*/}
          <div className='w-1/3 max-[1290px]:w-2/5 max-[1190px]:w-[45%] max-[900px]:w-full'>
            <OrderSummary totalPrice={totalPrice} />
          </div>
        </div>
      </div>

      {/* RelatedProducts ocupa todo el ancho, sin margen */}
      {items.length > 0 && items[0]?.product && (
        <div className='w-full pt-20'>
          <RelatedProducts
            _id={items[0]?.product?._id}
            section={items[0]?.product?.section?.slug}
            brand={items[0]?.product?.brand}
            style={items[0]?.product?.style}
            gender={items[0]?.product?.gender}
            variant='related'
            containerClass='flex flex-wrap gap-4 justify-center'
            itemClass='flex-1 min-w-[250px] max-w-[300px]'
          />
        </div>
      )}
    </>
  );
};
export default CartPage;
