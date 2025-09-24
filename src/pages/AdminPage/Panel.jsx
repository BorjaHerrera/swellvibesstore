import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthContext/AuthContext';

export const Panel = ({ activePanel, setActivePanel }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);

  const buttons = [
    {
      id: 'crear',
      label: 'Crear producto',
      icon: '/assets/crear.png',
      action: () => setActivePanel('crear')
    },
    {
      id: 'buscar',
      label: 'Buscar producto',
      icon: '/assets/buscar.png',
      action: () => setActivePanel('buscar')
    },
    {
      id: 'gestionar',
      label: 'Gestionar categorías',
      icon: '/assets/gestionar.png',
      action: () => setActivePanel('gestionar')
    },
    {
      id: 'logout',
      label: 'Cerrar sesión',
      icon: '/assets/logout.png',
      action: logout
    } // <-- aquí
  ];

  return (
    <div
      className={`bg-sky-950 text-white rounded-r-3xl shadow-xl transition-all duration-100 
        ${
          isOpen
            ? 'w-80 p-6 max-[425px]:p-3 max-[374px]:p-2'
            : 'w-16 p-2 max-[500px]:w-12'
        } 
        flex flex-col gap-6`}
    >
      {/* Botón para abrir/cerrar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 mb-4'
      >
        <img
          src='/assets/menu3.png'
          alt='Menu'
          className='w-8 h-8 cursor-pointer max-[500px]:w-6 max-[500px]:h-6'
        />
        {isOpen && <span className='font-bold text-lg'>Panel</span>}
      </button>

      {/* Botones del panel */}
      {isOpen && (
        <div className='flex flex-col gap-4'>
          {buttons.map(({ id, label, icon, action }) => (
            <button
              key={id}
              onClick={action}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${activePanel === id ? 'bg-pink-700' : 'hover:text-pink-500'}
                max-[396px]:text-sm`}
            >
              <img
                src={icon}
                alt={label}
                className='w-6 h-6 max-[396px]:w-4 max-[396px]:h-4'
              />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
