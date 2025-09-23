import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';

export const UserIcon = () => {
  const { user } = useContext(AuthContext);

  let to = '/usuarios/login';
  if (user) {
    to = user.rol === 'admin' ? '/admin' : `/usuarios/${user._id}`;
  }

  return (
    <NavLink
      to={to}
      aria-label='Ir a usuario'
      className='relative inline-flex items-center'
    >
      <img src='/assets/user.svg' alt='Usuario' className='w-5 h-5' />
    </NavLink>
  );
};
