import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ProductsDataService from '../../../services/products/products.services';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const res = await ProductsDataService.getAll().then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productsList: [],
    isLoading: true,
    hasError: false,
    searchTerm: ''
  },
  reducers: {
  },
  extraReducers: {
    [loadProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.productsList = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectVisibleProducts = (state) => {
  return state.products.productsList.filter(item =>
    item.title.toLowerCase().includes(state.products.searchTerm.toLowerCase())
  );
}

export const isLoadingProducts = (state) => {
  return state.products.isLoading;
}

export default productsSlice.reducer;
