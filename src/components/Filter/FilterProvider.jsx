import { useReducer } from 'react';
import {
  FILTER_INITIAL_STATE,
  filterReducer
} from '../../reducer/FilterReducer/FilterReducer';
import { FilterContext } from './FilterContext';

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, FILTER_INITIAL_STATE);
  return (
    <FilterContext.Provider value={{ state, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};
