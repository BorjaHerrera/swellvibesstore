import { Link } from 'react-router-dom';
import { productsArticles } from '../../utils/ProductsArticle';

export const ProductsHome = () => {
  return (
    <section
      className='
    flex flex-row items-stretch w-full h-auto border-t-4 border-white
    max-[800px]:justify-start max-[800px]:overflow-x-auto max-[800px]:flex-nowrap
    justify-center
  '
    >
      {productsArticles.map((article) => (
        <article
          key={article.id}
          className={`relative w-1/3  max-h-[600px] overflow-hidden ${
            article.id === 1 || article.id === 2
              ? 'border-r-4 border-white'
              : ''
          }
          max-[800px]:w-5/6 max-[800px]:flex-shrink-0
          `}
        >
          <Link to={article.buylink} className='relative block h-full w-full'>
            <div className='h-full w-full overflow-hidden'>
              <img
                src={article.image}
                alt={article.textLink}
                className='w-full h-full object-cover block transition-transform duration-300 hover:scale-105 hover:-rotate-1'
              />
            </div>
            <span className='absolute bottom-3 left-4 text-white underline text-lg font-semibold'>
              {article.textLink}
            </span>
          </Link>
        </article>
      ))}
    </section>
  );
};
