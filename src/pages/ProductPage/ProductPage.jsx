import { useParams } from 'react-router-dom';
import { ProductFetch } from './ProductFetch';
import { ProductCard } from './ProductCard';
import { RelatedProducts } from '../../components/RelatedProducts/RelatedProducts';

export const ProductPage = () => {
  const { section, id } = useParams();

  return (
    <>
      <ProductFetch section={section} id={id}>
        {({ product, error }) => {
          if (error) {
            return (
              <div className='flex justify-center items-center h-[60vh]'>
                <p className='text-red-500'>{error}</p>
              </div>
            );
          }
          if (!product) {
            return <p>Cargando producto...</p>;
          }

          // Aquí pon los logs para depurar
          console.log('Producto completo:', product);
          console.log('product.section:', product.section);

          return (
            <>
              <ProductCard
                product={product}
                showAddToCart={true}
                showDescription={true}
              />
              {product && (
                <RelatedProducts
                  _id={product._id}
                  section={
                    typeof product.section === 'string'
                      ? product.section
                      : product.section?.slug
                  }
                  brand={product.brand}
                  style={product.style}
                  gender={product.gender}
                />
              )}
            </>
          );
        }}
      </ProductFetch>
    </>
  );
};
