import { useRef } from 'react';
import { AddToCartButton } from '../../components/buttons/AddToCartButton';
import { Link } from 'react-router-dom';

export const ProductCard = ({
  product,
  showAddToCart = false,
  showDescription = false,
  variant = 'default'
}) => {
  const imageContainerRef = useRef(null);

  if (!product) return null;

  const handleMouseMove = (e) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    container.style.transformOrigin = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    const container = imageContainerRef.current;
    if (!container) return;
    container.style.transformOrigin = 'center';
  };

  //Vista de ProductCard en RelatedProduct

  if (variant === 'related') {
    return (
      <Link
        to={`/productos/${product.section.slug}/${product._id}`}
        className='block border p-3 rounded hover:shadow-md transition-shadow bg-white'
      >
        <div className='flex flex-col gap-2 h-[440px] max-[639px]:h-[600px]'>
          {/* Imagen más grande con object-cover */}
          <div className='relative w-full h-full rounded overflow-hidden bg-red-4'>
            <img
              src={product.image}
              alt={`Imagen de ${product.name}`}
              className='absolute inset-0 w-full h-full object-contain'
            />
          </div>

          {/* Info */}
          <div className='flex flex-col gap-1 p-2 h-[100px]'>
            <h2 className='text-base font-semibold line-clamp-2'>
              {product.name}
            </h2>
            <p className='text-teal-900 text-sm'>
              {Number(product.price).toFixed(2)} €
            </p>
          </div>
        </div>
      </Link>
    );
  }

  //Vista de ProductPage por defecto
  return (
    <article className='max-w-7xl mx-auto px-7 py-10'>
      <div className='grid grid-cols-[2fr_1.5fr] max-[1000px]:flex max-[1000px]:flex-col gap-10'>
        <div
          className='relative h-auto overflow-hidden rounded border p-4 bg-white'
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={imageContainerRef}
            className='w-full h-[600px] max-[600px]:h-[500px] max-[450px]:h-[400px]  transition-transform duration-300 ease-in-out will-change-transform hover:scale-125'
          >
            <img
              src={product.image}
              alt={`Imagen de ${product.name}`}
              className='w-full h-full object-contain rounded'
            />
          </div>
          :
        </div>

        {/* Info principal */}
        <div className='flex flex-col justify-between gap-6'>
          {/* Título, precio y descripción */}
          <div className='flex flex-col gap-3'>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
            <p className='text-2xl text-teal-700'>
              {Number(product.price).toFixed(2)} €
            </p>
            {showDescription && (
              <p className='text-gray-600'>{product.description}</p>
            )}
          </div>
          {showAddToCart && (
            <div>
              <AddToCartButton product={product} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
