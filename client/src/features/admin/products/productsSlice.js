import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductsDataService from "../../../services/products/products.services";

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async () => {
    const res = await ProductsDataService.getAll()
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const createProduct = createAsyncThunk(
  "products/addProduct",
  async (newProductInfo) => {
    const res = await ProductsDataService.create(newProductInfo)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const findProductDetails = createAsyncThunk(
  "products/findProductDetails",
  async (id) => {
    const res = await ProductsDataService.findById(id)
      .then((result) => {
        console.log(result.data);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }) => {
    const res = await ProductsDataService.update(id, data)
      .then((result) => {
        console.log(result);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (idArray) => {
    const res = await ProductsDataService.delete(idArray)
      .then((result) => {
        console.log(result);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productDetails: {},
    productsList: [],
    isLoading: true,
    hasError: false,
    searchTerm: "",
    selectedItems: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setProductDetails: (state, action) => {
      state.productDetails = action.payload;
    },
    selectItem: (state, action) => {
      state.selectedItems.includes(action.payload)
        ? (state.selectedItems = state.selectedItems.filter(
            (item) => item !== action.payload
          ))
        : state.selectedItems.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.productsList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productsList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(findProductDetails.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(findProductDetails.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(findProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const res = action.payload.data;
        console.log(res);
        state.productsList = state.productsList.map((item) => {
          return item.id === res.id ? (item = res.data) : item;
        });
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productsList = state.productsList.filter(
          (item) => !action.payload.idArray.includes(item.id)
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectProductDetails = (state) => {
  return state.products.productDetails;
};

export const selectVisibleProducts = (state) => {
  return state.products.productsList.filter((item) =>
    item.title.toLowerCase().includes(state.products.searchTerm.toLowerCase())
  );
};

export const selectSearchTerm = (state) => {
  return state.products.searchTerm;
};

export const selectedItems = (state) => {
  return state.products.selectedItems;
};

export const isLoadingProducts = (state) => {
  return state.products.isLoading;
};

export const { setSearchTerm, setProductDetails, selectItem } =
  productsSlice.actions;

export default productsSlice.reducer;
