import { useRelatedProducts } from '../../hooks/useRelatedProducts';
import { ProductCard } from '../../pages/ProductPage/ProductCard';

export const RelatedProducts = ({
  _id,
  section,
  brand,
  style,
  gender,
  variant = 'related'
}) => {
  const related = useRelatedProducts({ _id, section, brand, style, gender });

  if (!related.length) return null;

  return (
    <div className='p-7'>
      <h3 className='text-xl font-semibold mb-4'>También te puede interesar</h3>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {related.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} variant={variant} />
          </li>
        ))}
      </ul>
    </div>
  );
};
