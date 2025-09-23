import { CartIcon } from '../Cart/CartIcon';
import { Menu } from '../Menu/Menu';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { SearchInput } from '../SearchInput/SearchInput';
import { UserIcon } from '../userIcon/userIcon';

export const ResponsiveMenu = ({ state, dispatch }) => {
  return (
    <nav className='hidden max-[900px]:flex fixed top-2 right-3 w-2/3 z-50 justify-end pointer-events-auto'>
      <div className='flex w-full justify-end items-center gap-6 max-[450px]:gap-4 py-3 px-2'>
        <div className='flex items-center h-6'>
          <SearchInput />
        </div>
        <div className='flex items-center h-6'>
          <CartIcon />
        </div>
        <div className='flex items-center h-6'>
          <UserIcon />
        </div>
        <div className='flex items-center h-6'>
          <MusicPlayer />
        </div>
        <div className='flex items-center h-6'>
          <Menu state={state} dispatch={dispatch} />
        </div>
      </div>
    </nav>
  );
};
