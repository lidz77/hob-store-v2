import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/admin/categories/categoriesSlice';
import dimensionsReducer from '../features/admin/products/dimensionsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    dimensions: dimensionsReducer
  },
});
