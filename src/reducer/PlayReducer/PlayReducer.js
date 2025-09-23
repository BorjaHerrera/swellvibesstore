const initialIndex = parseInt(localStorage.getItem('currentIndex'), 10) || 0;

export const MUSIC_INITIAL_STATE = {
  isPlaying: false,
  currentIndex: initialIndex
};

export const musicReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case 'SET_INDEX':
      localStorage.setItem('currentIndex', action.payload);
      return {
        ...state,
        currentIndex: action.payload
      };
    default:
      return state;
  }
};
