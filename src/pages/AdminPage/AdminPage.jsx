import { useState } from 'react';
import { Panel } from './Panel';
import { CategoryForm } from '../../components/ProductsForm/CategoryForm';
import { CreateProduct } from './CreateProduct';
import { ProductsDashboard } from './ProductDashboard';

export const AdminPage = () => {
  const [activePanel, setActivePanel] = useState('crear');

  return (
    <div className='flex min-h-screen w-full my-8 rounded shadow-md bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] gap-2'>
      <Panel activePanel={activePanel} setActivePanel={setActivePanel} />

      {/* Contenedor principal */}
      <div className='flex-1 p-0'>
        {activePanel === 'crear' && <CreateProduct />}
        {activePanel === 'buscar' && <ProductsDashboard />}
        {activePanel === 'gestionar' && <CategoryForm />}
      </div>
    </div>
  );
};
