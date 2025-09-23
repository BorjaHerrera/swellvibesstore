export const ConfirmModal = ({
  isOpen,
  title = 'Confirmar acción',
  message,
  onCancel,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 z-50'>
      <div className='bg-[#0f172a] p-6 rounded-lg shadow-lg w-96 text-white'>
        <h3 className='text-lg font-bold mb-4'>{title}</h3>
        <p className='mb-4'>{message}</p>
        <div className='flex justify-center gap-3'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition'
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className='px-4 py-2 rounded bg-red-700 hover:bg-red-800 transition'
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};
