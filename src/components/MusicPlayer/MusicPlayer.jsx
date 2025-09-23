import { useContext } from 'react';
import { MusicContext } from './MusicContext';
import { togglePlay } from '../../reducer/PlayReducer/PlayActions';
import { PlayPauseSwitch } from '../animate-ui/PlayPauseSwitch';

export const MusicPlayer = () => {
  const { state, dispatch } = useContext(MusicContext);
  const { isPlaying } = state;

  return (
    <PlayPauseSwitch
      isPlaying={isPlaying}
      onToggle={() => togglePlay(dispatch)}
    />
  );
};
