import { calculateTotals } from '../../functions/calculateTotals';

export const CART_INITIAL_STATE = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  cartSource: 'guest'
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART': {
      const { items, cartSource } = action.payload;
      const { totalItems, totalPrice } = calculateTotals(items || []);
      return {
        ...state,
        items: items || [],
        totalItems,
        totalPrice,
        cartSource: cartSource ?? state.cartSource
      };
    }

    case 'ADD_TO_CART': {
      const newItem = action.payload; // { product: {...}, quantity }
      if (!newItem || !newItem.product || !newItem.product._id) return state;

      const existingItem = state.items.find(
        (item) => item.product && item.product._id === newItem.product._id
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.product && item.product._id === newItem.product._id
            ? { ...item, quantity: Number(newItem.quantity) || 1 }
            : item
        );
      } else {
        updatedItems = [
          ...state.items,
          { ...newItem, quantity: Number(newItem.quantity) || 1 }
        ];
      }

      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case 'REMOVE_FROM_CART': {
      const productId = action.payload;
      if (!productId) return state;

      const updatedItems = state.items.filter(
        (item) => item.product && item.product._id !== productId
      );

      const { totalItems, totalPrice } = calculateTotals(updatedItems);

      return { ...state, items: updatedItems, totalItems, totalPrice };
    }

    case 'CLEAR_CART':
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };

    case 'SET_CART_SOURCE':
      return { ...state, cartSource: action.payload };

    default:
      return state;
  }
};
