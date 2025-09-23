export const CloseMenuButton = ({ onClose }) => (
  <button
    onClick={onClose}
    className='bg-white w-12 h-12 flex items-center justify-center rounded shadow cursor-pointer'
    aria-label='Cerrar menú'
  >
    <span className='text-black text-2xl'>X</span>
  </button>
);
