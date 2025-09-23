export const INITIAL_STATE = {
  isOpen: false,
  currentView: 'categories',
  selectedCategory: null,
  subcategories: [],
  filterKey: ''
};

export const menuReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case 'OPEN_MENU':
      return {
        ...state,
        isOpen: true
      };
    case 'CLOSE_MENU':
      return INITIAL_STATE;

    case 'SELECT_CATEGORY':
      return {
        ...state,
        currentView: 'subcategories',
        selectedCategory: action.payload
      };

    case 'SET_SUBCATEGORIES':
      return {
        ...state,
        subcategories: action.payload.subcategories,
        filterKey: action.payload.filterKey
      };
    case 'GO_BACK_TO_CATEGORIES':
      return {
        ...state,
        currentView: 'categories',
        selectedCategory: null,
        filterKey: null
      };
    default:
      return state;
  }
};
