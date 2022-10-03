import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/admin/categories/categoriesSlice';
import dimensionsReducer from '../features/admin/products/dimensionsSlice';
import productsReducer from '../features/admin/products/productsSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    dimensions: dimensionsReducer,
    products: productsReducer
  },
});
