export const togglePlay = (dispatch) => {
  dispatch({
    type: 'TOGGLE_PLAY'
  });
};

export const setIndex = ({ dispatch, currentIndex }) => {
  dispatch({
    type: 'SET_INDEX',
    payload: currentIndex
  });
};
