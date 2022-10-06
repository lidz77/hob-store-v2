import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/admin/categories/categoriesSlice';
import productDetailsReducer from '../features/admin/products/productDetailsSlice';
import productsReducer from '../features/admin/products/productsSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    productDetails: productDetailsReducer,
    products: productsReducer
  },
});
