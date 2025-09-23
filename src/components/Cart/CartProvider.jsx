import { useEffect, useReducer, useState } from 'react';
import { CartContext } from './CartContext';
import {
  cartReducer,
  CART_INITIAL_STATE
} from '../../reducer/CartReducer/cartReducer';
import { setCart } from '../../reducer/CartReducer/cartActions';
import { getUserAuth } from '../../functions/getUserAuth';
import { API } from '../../utils/API/API';

export const CartProvider = ({ children }) => {
  // Añadir producto al backend y sincronizar estado local
  const addProductToCart = async (product, quantity = 1) => {
    if (!guestCartId) return;
    try {
      const res = await API({
        method: 'POST',
        endpoint: `/cart/${guestCartId}/product`,
        body: { productId: product._id, quantity }
      });
      setCart({ dispatch, items: res.items || [], cartSource: 'guest' });
      localStorage.setItem('cart', JSON.stringify(res.items || []));
    } catch (error) {
      console.error('Error añadiendo producto al carrito:', error);
    }
  };
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE, () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart
      ? { ...CART_INITIAL_STATE, items: JSON.parse(savedCart) }
      : CART_INITIAL_STATE;
  });

  const { items, cartSource } = state;
  const { userId, token } = getUserAuth();
  const [guestCartId, setGuestCartId] = useState(
    localStorage.getItem('cartId')
  );
  const [loadingCart, setLoadingCart] = useState(true);

  // 1️⃣ Crear carrito guest si no existe
  useEffect(() => {
    if (cartSource !== 'guest' || guestCartId) {
      setLoadingCart(false);
      return;
    }

    const createGuestCart = async () => {
      try {
        const res = await API({ method: 'POST', endpoint: '/cart' });
        const cartId = res.cartId || res.data?.cartId;
        if (!cartId) throw new Error('No se recibió cartId del backend');

        localStorage.setItem('cartId', cartId);
        setGuestCartId(cartId);
        console.log('Nuevo carrito guest creado con ID:', cartId);
      } catch (error) {
        console.error('Error creando carrito guest:', error);
      }
    };

    createGuestCart();
  }, [cartSource, guestCartId]);

  // 2️⃣ Cargar carrito guest solo si localStorage está vacío
  useEffect(() => {
    const loadGuestCart = async () => {
      if (cartSource !== 'guest' || !guestCartId) return;

      try {
        const localItems = JSON.parse(localStorage.getItem('cart') || '[]');
        if (localItems.length > 0) {
          // Si ya hay items en localStorage, no sobrescribimos
          setCart({ dispatch, items: localItems, cartSource: 'guest' });
          setLoadingCart(false);
          return;
        }

        // Si no hay items en localStorage, cargamos desde backend
        const data = await API({
          method: 'GET',
          endpoint: `/cart/${guestCartId}`
        });
        setCart({ dispatch, items: data.items || [], cartSource: 'guest' });
        localStorage.setItem('cart', JSON.stringify(data.items || []));
      } catch (error) {
        console.error('Error cargando carrito guest:', error);
        setCart({ dispatch, items: [], cartSource: 'guest' });
      } finally {
        setLoadingCart(false);
      }
    };

    loadGuestCart();
  }, [cartSource, guestCartId, dispatch]);

  // 3️⃣ Cargar carrito de usuario registrado
  useEffect(() => {
    const loadUserCart = async () => {
      if (cartSource !== 'user' || !userId) {
        setLoadingCart(false);
        return;
      }

      try {
        const data = await API({
          method: 'GET',
          endpoint: `/${userId}/cart`,
          token
        });
        setCart({ dispatch, items: data || [], cartSource: 'user' });
      } catch (error) {
        console.error('Error cargando carrito de usuario:', error);
        setCart({ dispatch, items: [], cartSource: 'user' });
      } finally {
        setLoadingCart(false);
      }
    };

    loadUserCart();
  }, [cartSource, userId, token, dispatch]);

  // 4️⃣ Guardar carrito en localStorage o backend al actualizar items
  useEffect(() => {
    if (cartSource === 'guest') {
      localStorage.setItem('cart', JSON.stringify(items));
    } else if (cartSource === 'user' && userId) {
      API({
        method: 'PUT',
        endpoint: `/${userId}/cart`,
        body: items,
        token
      }).catch((err) => console.error('Error guardando carrito:', err));
    }
  }, [items, cartSource, userId, token]);

  return (
    <CartContext.Provider
      value={{ state, dispatch, guestCartId, loadingCart, addProductToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
