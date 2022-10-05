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

export const createProduct = createAsyncThunk(
  'products/addProduct',
  async (newProductInfo) => {
    const res = await ProductsDataService.create(newProductInfo).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

export const findProduct = createAsyncThunk(
  'products/findProduct',
  async (id) => {
    const res = await ProductsDataService.findById(id).then((result) => {
      console.log(result);
      return result;
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
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
    [createProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.productsList.push(action.payload)
      state.isLoading = false;
      state.hasError = false;
    },
    [createProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [findProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [findProduct.fulfilled]: (state, action) => {
      // console.log(action.payload);
      state.productsList.push(action.payload)
      state.isLoading = false;
      state.hasError = false;
    },
    [findProduct.rejected]: (state, action) => {
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

export const selectSearchTerm = (state) => {
  return state.products.searchTerm;
}

export const isLoadingProducts = (state) => {
  return state.products.isLoading;
}

export const {
  setSearchTerm
} = productsSlice.actions;

export default productsSlice.reducer;
