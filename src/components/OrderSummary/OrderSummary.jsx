import React from 'react';
import { ConfirmOrderButton } from '../buttons/ConfirmOrderButton';

export const OrderSummary = ({ totalPrice }) => {
  return (
    <div className='flex flex-col gap-5 w-full pt-2'>
      <div className='flex flex-col w-full border p-4 rounded gap-4'>
        <h2 className='text-xl font-semibold mb-4'>Resumen del pedido</h2>

        <div className='flex justify-between mb-2'>
          <span>Subtotal</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>

        <div className='flex justify-between mb-2'>
          <span>Gastos de envío</span>
          <span>Gratis</span>
        </div>

        <div className='flex mb-2'>
          <span>Devolución gratuita en 30 días</span>
        </div>

        <div className='flex justify-between font-bold text-lg mb-4'>
          <span>Total pedido</span>
          <span>{totalPrice.toFixed(2)} €</span>
        </div>
      </div>
      <ConfirmOrderButton />
    </div>
  );
};
