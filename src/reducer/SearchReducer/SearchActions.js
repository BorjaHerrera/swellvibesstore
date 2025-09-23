export const openInput = (dispatch) => {
  dispatch({ type: 'OPEN_INPUT' });
};

export const setQuery = ({ dispatch, query }) => {
  dispatch({
    type: 'SET_QUERY',
    payload: query
  });
};

export const resetQuery = (dispatch) => {
  dispatch({
    type: 'RESET_QUERY'
  });
};

export const setResults = ({ dispatch, results }) => {
  dispatch({
    type: 'SET_RESULTS',
    payload: results
  });
};

export const closeInput = (dispatch) => {
  dispatch({ type: 'CLOSE_INPUT' });
};
