import { useContext } from 'react';
import { LoadingContext } from '../../components/Loading/LoadingContext';
import { Link } from 'react-router-dom';

export const ProductsList = ({ products, error, onProductClick }) => {
  const { loading } = useContext(LoadingContext);

  if (error) {
    return (
      <div className='flex items-center justify-center h-[60vh]'>
        <p className='text-red-500 text-lg'>{error}</p>
      </div>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <div className='flex items-center justify-center h-[60vh]'>
        <p className='text-gray-600 text-lg'>No hay productos</p>
      </div>
    );
  }

  return (
    <div className='flex-1'>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-auto'>
        {products.map((product) => (
          <li key={product._id}>
            <Link
              to={`/productos/${product.section.slug}/${product._id}`}
              className='block border p-4 pb-0 rounded shadow-sm hover:shadow-md transition-shadow'
              onClick={onProductClick}
            >
              <div className='flex flex-col gap-2 h-auto'>
                <div className='relative w-full h-96 rounded'>
                  <img
                    src={product.image}
                    alt={`Imagen de ${product.name}`}
                    className='absolute inset-0 w-full h-full object-contain'
                  />
                </div>
                <div className='flex flex-col gap-1 h-[150px] p-2 rounded'>
                  <h2 className='text-lg font-semibold pt-3'>{product.name}</h2>
                  <p className='text-teal-900'>
                    {Number(product.price).toFixed(2)} €
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
