import { useEffect, useRef, useState } from 'react';
import {
  openMenu,
  selectCategory,
  setSubcategories,
  closeMenu,
  goBackToCategories
} from '../../reducer/MenuReducer/menuActions';
import { NavLink, useLocation } from 'react-router-dom';
import { API } from '../../utils/API/API';
import { CloseMenuButton } from '../buttons/CloseMenuButton';

export const Menu = ({ state = {}, dispatch = () => {} }) => {
  const { isOpen, currentView, selectedCategory, subcategories, filterKey } =
    state;

  const location = useLocation();
  const prevLocationRef = useRef(location);

  useEffect(() => {
    if (
      isOpen &&
      (location.pathname !== prevLocationRef.current.pathname ||
        location.search !== prevLocationRef.current.search)
    ) {
      closeMenu(dispatch);
    }
    prevLocationRef.current = location;
  }, [location, isOpen, dispatch]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    API({ endpoint: '/categorias' })
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => openMenu(dispatch)}
          aria-label='Abrir menú'
          className='text-3xl'
        >
          ≡
        </button>
      )}

      {isOpen && (
        <nav
          className='
            fixed top-0 left-0
            min-h-[100dvh]
            w-[25rem] max-[1000px]:w-full
            bg-gradient-to-b
            from-[rgba(15,52,67,0.95)]
            via-[rgba(6,100,130,0.7)]
            to-[rgba(15,52,67,0.95)]
            flex flex-col justify-between
            p-6 pt-20
            text-white
            z-50
          '
        >
          <div>
            {currentView === 'categories' && (
              <ul className='flex flex-col gap-4'>
                {categories.map((category) => (
                  <li key={category._id}>
                    <button
                      onClick={async () => {
                        try {
                          const data = await API({
                            endpoint: `/categorias/filtradas?section=${category.slug}`
                          });
                          console.log('data recibida del backend:', data);

                          const filters = data.filters || {};

                          // Elegir 'style' si hay al menos un valor válido, si no 'brand'
                          let filterKeyToUse;
                          if (
                            filters.style &&
                            !filters.style.every(
                              (value) => !value || value.trim() === ''
                            )
                          ) {
                            filterKeyToUse = 'style';
                          } else if (
                            filters.brand &&
                            filters.brand.length > 0
                          ) {
                            filterKeyToUse = 'brand';
                          } else {
                            filterKeyToUse = Object.keys(filters)[0]; // fallback
                          }

                          setSubcategories({
                            dispatch,
                            subcategories: filters[filterKeyToUse] || [],
                            filterKey: filterKeyToUse
                          });

                          selectCategory({
                            dispatch,
                            selectedCategory: category
                          });
                        } catch (error) {
                          console.error(
                            'Error al obtener subcategorías',
                            error
                          );
                        }
                      }}
                      className='flex items-center justify-between w-full text-left'
                    >
                      <span
                        className='
      relative text-lg cursor-pointer
      transform transition duration-150 origin-bottom-right
      hover:-translate-y-1 hover:-rotate-3 hover:underline-none
      before:absolute before:-bottom-0.5 before:left-0 before:h-[1px] before:w-0
      before:bg-current before:transition-all before:duration-150
      hover:before:w-full
    '
                      >
                        {category.name}
                      </span>
                      <span className='text-xl pr-4'>{'>'}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {currentView === 'subcategories' && selectedCategory && (
              <div>
                <button
                  onClick={() => goBackToCategories(dispatch)}
                  className='text-lg font-bold pb-5'
                >
                  ← Volver a categorías
                </button>
                <h3 className='text-lg font-bold pb-5'>
                  {selectedCategory.name}
                </h3>
                <ul className='flex flex-col gap-4'>
                  {Array.isArray(subcategories) &&
                    subcategories.map((value) => (
                      <li key={value}>
                        <NavLink
                          to={`/productos?section=${
                            selectedCategory.slug
                          }&${filterKey}=${encodeURIComponent(value)}`}
                        >
                          {value}
                        </NavLink>
                      </li>
                    ))}
                </ul>
                <div className='mt-4'>
                  <NavLink
                    to={`/productos?section=${selectedCategory.slug}`}
                    className='font-bold'
                  >
                    Ver todo
                  </NavLink>
                </div>
              </div>
            )}

            <div className='flex justify-end buttom-0 pt-[480px] max-[550px]:pt-[450px] max-[400px]:pt-[400px]'>
              <CloseMenuButton onClose={() => closeMenu(dispatch)} />
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
