import { useState } from 'react';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';

export const DeleteAccountButton = ({ onDelete, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    onDelete();
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`w-full bg-pink-700 text-white font-semibold py-2 px-4 rounded 
                    hover:bg-pink-600 transition mt-2 ${className}`}
      >
        ELIMINAR CUENTA
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title='Eliminar cuenta'
        message='¿Estás seguro de que quieres eliminar tu cuenta?'
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};
