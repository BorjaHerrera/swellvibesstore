import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from './SearchContext';
import { ProductsList } from '../../pages/ProductsPage/ProductsList';
import { closeInput } from '../../reducer/SearchReducer/SearchActions';
import { trendingItems } from '../../utils/trendingItems';

export const SearchResults = () => {
  const { state, dispatch } = useContext(SearchContext);
  const { results, query } = state;

  if (!query) {
    return (
      <div className='w-full bg-red-100 p-4'>
        <p className='text-sm text-gray-600 mb-5 pl-[17%] max-[900px]:pl-0'>
          Es tendencia
        </p>
        <ul className='flex flex-wrap gap-2 w-full bg-red-100 pl-[17%] max-[900px]:pl-0'>
          {trendingItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className='px-3 py-1 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (query) {
    return (
      <div className='p-4'>
        <ProductsList
          products={results}
          onProductClick={() => closeInput(dispatch)}
        />
      </div>
    );
  }
};
