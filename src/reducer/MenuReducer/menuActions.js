export const toggleMenu = (dispatch) => {
  dispatch({ type: 'TOGGLE_MENU' });
};

export const openMenu = (dispatch) => {
  dispatch({ type: 'OPEN_MENU' });
};

export const closeMenu = (dispatch) => {
  dispatch({ type: 'CLOSE_MENU' });
};

export const selectCategory = ({ dispatch, selectedCategory }) => {
  dispatch({
    type: 'SELECT_CATEGORY',
    payload: selectedCategory
  });
};

export const setSubcategories = ({ dispatch, subcategories, filterKey }) => {
  dispatch({
    type: 'SET_SUBCATEGORIES',
    payload: { subcategories, filterKey }
  });
};

export const goBackToCategories = (dispatch) => {
  dispatch({ type: 'GO_BACK_TO_CATEGORIES' });
};
