import { useReducer } from 'react';
import {
  INITIAL_STATE,
  menuReducer
} from '../../reducer/MenuReducer/menuReducer';
import { Menu } from '../Menu/Menu';
import { ResponsiveMenu } from '../ResponsiveMenu/ResponsiveMenu';
import { Logo } from '../Logo/Logo';
import { SearchInput } from '../SearchInput/SearchInput';
import { CartIcon } from '../Cart/CartIcon';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';
import { UserIcon } from '../userIcon/userIcon';

export const Header = () => {
  const [state, dispatch] = useReducer(menuReducer, INITIAL_STATE);
  const { isOpen: isMenuOpen } = state;

  return (
    <>
      <header className='fixed top-0 left-0 w-full h-16 px-7 flex items-center z-50 bg-white'>
        <div className='hidden min-[901px]:grid grid-cols-[1fr_auto_1fr] items-center w-full'>
          {/* Menú escritorio (izquierda) */}
          <div className='flex justify-start gap-4 w-full'>
            <Menu state={state} dispatch={dispatch} />
          </div>

          {/* Logo centrado */}
          <Logo />

          {/* Iconos derecha */}
          <div
            className={`flex items-center justify-end gap-4 w-full ${
              isMenuOpen ? 'pointer-events-none opacity-50' : 'opacity-100'
            }`}
          >
            <SearchInput />
            <CartIcon />
            <UserIcon />
            <div className='-mt-1'>
              <MusicPlayer />
            </div>
          </div>
        </div>

        {/* Logo móvil */}
        <div className='min-[901px]:hidden flex items-center'>
          <Logo />
        </div>
      </header>

      {/* Menú inferior en móvil */}
      <ResponsiveMenu state={state} dispatch={dispatch} />
    </>
  );
};
