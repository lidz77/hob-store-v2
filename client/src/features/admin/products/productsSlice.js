import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ProductsDataService from '../../../services/products/products.services';

export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    const res = await ProductsDataService.getAll().then((result) => {
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

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({id, data}) => {
    const res = await ProductsDataService.update(id, data).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async(idArray) => {
    const res = await ProductsDataService.delete(idArray).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const convertingResult = (arrayOfResult) => {
  arrayOfResult.forEach((item) => {
    item.dimension = item.dimension[0];
    item.brand = item.brand[0];
    item.material = item.material[0];
  });
  return arrayOfResult;
}

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    productDetails: {},
    productsList: [],
    isLoading: true,
    hasError: false,
    searchTerm: '',
    selectedItems: []
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    }
  },
  extraReducers: {
    [loadProducts.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadProducts.fulfilled]: (state, action) => {
      state.productsList = convertingResult(action.payload);
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
    [updateProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      const res = action.payload.data;
      console.log(res);
      state.productsList = state.productsList.map(item =>
        {
          return item.id === res.id ? item = res.data : item;
        }
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.productsList = state.productsList.filter(item => !action.payload.idArray.includes(item.id));
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectProductDetails = (state) => {
  return state.products.productDetails;
}

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
  setSearchTerm,
  setProductDetails
} = productsSlice.actions;

export default productsSlice.reducer;
