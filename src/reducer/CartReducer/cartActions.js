export const setCart = ({ dispatch, items, cartSource }) => {
  dispatch({ type: 'SET_CART', payload: { items, cartSource } });
};

export const addToCart = ({ dispatch, item }) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
};

export const removeFromCart = ({ dispatch, productId }) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
};

export const clearCart = (dispatch) => {
  dispatch({ type: 'CLEAR_CART' });
};

export const setCartSource = ({ dispatch, cartSource }) => {
  dispatch({ type: 'SET_CART_SOURCE', payload: cartSource });
};
