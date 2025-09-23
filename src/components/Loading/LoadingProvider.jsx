import { useState } from 'react';
import { LoadingContext } from './LoadingContext';

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}

      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50'>
          <div className='animate-spin rounded-full border-8 border-t-8 border-gray-200 border-t-teal-600 h-16 w-16'></div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
