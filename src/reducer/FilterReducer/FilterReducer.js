export const FILTER_INITIAL_STATE = {
  section: '',
  availableFilters: {},
  filters: {},
  selectedSort: null,
  isOpen: false
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTION':
      return {
        ...state,
        section: action.payload
      };

    case 'SET_AVAILABLE_FILTERS': {
      const filters = action.payload;

      // Filtrar solo los que tienen al menos un valor válido
      const filtered = Object.entries(filters).reduce((acc, [key, values]) => {
        if (
          Array.isArray(values) &&
          !values.every((value) => !value || value.trim() === '')
        ) {
          acc[key] = values;
        }
        return acc;
      }, {});

      return {
        ...state,
        availableFilters: filtered
      };
    }

    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload
      };

    case 'SET_SORT_PRICE':
      return {
        ...state,
        selectedSort: action.payload
      };

    case 'SET_IS_OPEN':
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case 'RESET_FILTERS':
      return FILTER_INITIAL_STATE;
    default:
      return state;
  }
};
