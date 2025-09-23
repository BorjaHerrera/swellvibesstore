export const navigateAndCloseMenu = ({ dispatch, navigate, path }) => {
  navigate(path), dispatch({ type: 'CLOSE_MENU ' });
};
