import { useReducer, useRef, useEffect, useState } from 'react';
import { MusicContext } from './MusicContext';
import {
  MUSIC_INITIAL_STATE,
  musicReducer
} from '../../reducer/PlayReducer/PlayReducer';
import { setIndex } from '../../reducer/PlayReducer/PlayActions';
import { API } from '../../utils/API/API';

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, MUSIC_INITIAL_STATE);
  const { isPlaying, currentIndex } = state;

  const [songs, setSongs] = useState([]);
  const audioRef = useRef(null);

  useEffect(() => {
    API({ endpoint: '/canciones' })
      .then((data) => setSongs(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!audioRef.current || songs.length === 0 || !songs[currentIndex]) return;

    audioRef.current.src = songs[currentIndex].audioUrl;
    audioRef.current.load();
    audioRef.current.volume = 1;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentIndex, songs]);

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setIndex({ dispatch, currentIndex: nextIndex });
  };

  return (
    <MusicContext.Provider value={{ state, dispatch, songs, audioRef }}>
      <audio ref={audioRef} onEnded={handleEnded} />
      {children}
    </MusicContext.Provider>
  );
};
