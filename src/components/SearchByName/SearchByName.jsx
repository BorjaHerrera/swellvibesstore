import { DashboardSearchInput } from '../DashboardSearchInput/DashboardSearchInput';

export const SearchByName = () => {
  return (
    <div className='mb-6 p-4 rounded bg-white/10'>
      <h3 className='text-lg font-semibold mb-4'>Buscar por nombre</h3>
      <DashboardSearchInput />
    </div>
  );
};
