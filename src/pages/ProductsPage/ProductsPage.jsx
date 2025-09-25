import { NavLink, useSearchParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { FilterContext } from '../../components/Filter/FilterContext';
import {
  filterIsOpen,
  setAvailableFilters,
  setFilters,
  setSection,
  setSortPrice
} from '../../reducer/FilterReducer/FilterActions';
import { ProductsFetch } from './ProductsFetch';
import { getCategoryFilters } from '../../functions/getCategoryFilters';
import { ProductsList } from './ProductsList';
import { FilterPanel } from '../../components/Filter/FilterPanel';
import { ScrollToTopSamePage } from '../../components/ScrollToTop/ScrollToTopSamePage';
import { PaginationButtons } from '../../components/PaginationButtons/PaginationButtons';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useContext(FilterContext);
  const { isOpen } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const section = searchParams.get('section') || 'Swell Vibes';

  useEffect(() => {
    const section = searchParams.get('section') || '';
    const gender = searchParams.get('gender');
    const style = searchParams.get('style');
    const brand = searchParams.get('brand');
    const sortPrice = searchParams.get('sortPrice');

    setSection({ dispatch, section });

    getCategoryFilters(section)
      .then((availableFilters) => {
        setAvailableFilters({ dispatch, availableFilters });

        const newFilters = {};
        if (gender) newFilters.gender = [gender];
        if (style) newFilters.style = [style];
        if (brand) newFilters.brand = [brand];

        setFilters({ dispatch, filters: newFilters });

        if (sortPrice) {
          setSortPrice({ dispatch, value: sortPrice });
        }
      })
      .catch((error) => {
        console.error('Error al cargar filtros disponibles:', error);
        setAvailableFilters({ dispatch, availableFilters: {} });
        setFilters({ dispatch, filters: {} });
      });

    setCurrentPage(1);
  }, [searchParams, dispatch]);

  const readableSection =
    section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');

  return (
    <>
      <ProductsFetch>
        {({ products, error }) => {
          const totalPages = Math.ceil(products.length / productsPerPage);
          const startIndex = (currentPage - 1) * productsPerPage;
          const endIndex = startIndex + productsPerPage;
          const visibleProducts = products.slice(startIndex, endIndex);

          return (
            <section aria-label='Listado de productos' className='p-4'>
              <ScrollToTopSamePage trigger={currentPage} />

              <div className='relative sticky top-16 z-20 w-full bg-white pb-5'>
                <div className='flex flex-col items-start px-3 gap-1 max-[1000px]:flex-row max-[1000px]:justify-between max-[1000px]:items-end'>
                  <h1 className='text-2xl font-semibold'>
                    <NavLink
                      to={`/productos?section=${section}`}
                      className='hover:underline underline-offset-4'
                    >
                      {readableSection}
                    </NavLink>
                  </h1>{' '}
                  <button
                    className='flex items-center py-1 text-sm'
                    onClick={() => filterIsOpen(dispatch)}
                    aria-expanded={isOpen}
                    aria-controls='filter-aside'
                  >
                    <span className='max-[1000px]:hidden'>
                      {isOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
                    </span>{' '}
                    <img
                      src='/assets/filtro.png'
                      alt='Icono filtro'
                      className='ml-2 w-5 h-5'
                    />
                  </button>
                </div>
              </div>

              <div className='relative'>
                <FilterPanel />
                <div
                  className={`transition-all duration-300 ${
                    isOpen ? 'ml-96' : ''
                  }`}
                >
                  <ProductsList products={visibleProducts} error={error} />
                </div>
              </div>

              {totalPages > 1 && (
                <PaginationButtons
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </section>
          );
        }}
      </ProductsFetch>
    </>
  );
};
