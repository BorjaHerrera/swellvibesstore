export const SEARCH_INITIAL_STATE = {
  isOpen: false,
  query: '',
  results: []
};

export const searchReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_INPUT':
      return {
        ...state,
        isOpen: true
      };

    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload
      };

    case 'RESET_QUERY':
      return {
        ...state,
        query: '',
        results: []
      };

    case 'SET_RESULTS':
      return {
        ...state,
        results: action.payload
      };

    case 'CLOSE_INPUT':
      return SEARCH_INITIAL_STATE;

    default:
      return state;
  }
};
