export const setSection = ({ dispatch, section }) => {
  dispatch({
    type: 'SET_SECTION',
    payload: section
  });
};

export const setAvailableFilters = ({ dispatch, availableFilters }) => {
  dispatch({
    type: 'SET_AVAILABLE_FILTERS',
    payload: availableFilters
  });
};

export const setFilters = ({ dispatch, filters }) => {
  dispatch({
    type: 'SET_FILTERS',
    payload: filters
  });
};

export const setSortPrice = ({ dispatch, value }) => {
  dispatch({
    type: 'SET_SORT_PRICE',
    payload: value
  });
};

export const filterIsOpen = (dispatch) => {
  dispatch({ type: 'SET_IS_OPEN' });
};

export const resetFilters = (dispatch) => {
  dispatch({ type: 'RESET_FILTERS' });
};
