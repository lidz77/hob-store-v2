import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/admin/categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
