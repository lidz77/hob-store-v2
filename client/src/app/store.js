import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/admin/categories/categoriesSlice';
import productPropsReducer from '../features/admin/products/productPropsSlice';
import productsReducer from '../features/admin/products/productsSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    productProps: productPropsReducer,
    products: productsReducer
  },
});
