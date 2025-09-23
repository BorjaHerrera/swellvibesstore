import { useContext, useState } from 'react';
import { FilterContext } from './FilterContext';
import { setFilters } from '../../reducer/FilterReducer/FilterActions';
import { useSearchParams } from 'react-router-dom';
import { applyFiltersToURL } from './applyFiltersToURL';

const FILTER_LABELS = {
  brand: 'Marcas',
  gender: 'Género',
  style: 'Tipos de tabla',
  size: 'Tallas',
  color: 'Colores'
};

export const Filter = () => {
  const { state, dispatch } = useContext(FilterContext);
  const { availableFilters, filters, section } = state;

  const [, setSearchParams] = useSearchParams();

  const [openSections, setOpenSections] = useState({ brand: true });

  const toggleSection = (filterKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  const handleFilterValue = (filterKey, value) => {
    const currentValues = filters[filterKey] || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    const newFilters = {
      ...filters,
      [filterKey]: updatedValues
    };

    setFilters({
      dispatch,
      filters: newFilters
    });

    applyFiltersToURL({
      filters: newFilters,
      section,
      setSearchParams
    });
  };

  if (!availableFilters || Object.keys(availableFilters).length === 0)
    return null;

  return (
    <div className='border-t border-gray-300 py-4'>
      {Object.entries(availableFilters).map(([filterKey, values]) => (
        <div key={filterKey} className='border-b border-gray-300 pb-4 mb-4'>
          <button
            className='flex justify-between items-center w-full font-semibold'
            onClick={() => toggleSection(filterKey)}
            aria-expanded={!!openSections[filterKey]}
            aria-controls={`filter-section-${filterKey}`}
          >
            <span>{FILTER_LABELS[filterKey] || filterKey}</span>
            <img
              src={
                openSections[filterKey]
                  ? '/assets/flecha-arriba.png'
                  : '/assets/flecha-abajo.png'
              }
              alt={openSections[filterKey] ? 'Arriba' : 'Abajo'}
              className='w-4 h-4'
            />
          </button>

          {openSections[filterKey] && (
            <div
              id={`filter-section-${filterKey}`}
              className='mt-2 space-y-2'
              role='region'
              aria-label={FILTER_LABELS[filterKey] || filterKey}
            >
              {values.map((value) => (
                <label
                  key={value}
                  className='flex items-center gap-2 cursor-pointer'
                >
                  <input
                    type='checkbox'
                    checked={filters[filterKey]?.includes(value) || false}
                    onChange={() => handleFilterValue(filterKey, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
