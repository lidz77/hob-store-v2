import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ProductDetailsDataService from '../../../services/products/productdetails.services';


const deleteById = (id, objectsArray) => {
  objectsArray.splice(objectsArray.findIndex(i => i.id === id), 1);
  return objectsArray;
}

export const loadDimensions = createAsyncThunk(
  'products/productDetails/loadDimensions',
  async () => {
    const res = await ProductDetailsDataService.getAll('dimensions').then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteDimension = createAsyncThunk(
  'products/productDetails/deleteDimension',
  async (id) => {
    const res = await ProductDetailsDataService.delete('dimensions', id).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addDimension = createAsyncThunk(
  'products/productDetails/addDimension',
  async (newData) => {
    const res = await ProductDetailsDataService.create('dimensions', newData).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)
export const loadBrands = createAsyncThunk(
  'products/productDetails/loadBrands',
  async () => {
    const res = await ProductDetailsDataService.getAll('brands').then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteBrand = createAsyncThunk(
  'products/productDetails/deleteBrand',
  async (id) => {
    const res = await ProductDetailsDataService.delete('brands', id).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addBrand = createAsyncThunk(
  'products/productDetails/addBrand',
  async (newData) => {
    const res = await ProductDetailsDataService.create('brands', newData).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

export const loadMaterials = createAsyncThunk(
  'products/productDetails/loadMaterials',
  async () => {
    const res = await ProductDetailsDataService.getAll('materials').then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteMaterial = createAsyncThunk(
  'products/productDetails/deleteMaterial',
  async (id) => {
    const res = await ProductDetailsDataService.delete('materials', id).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addMaterial = createAsyncThunk(
  'products/productDetails/addMaterial',
  async (newData) => {
    const res = await ProductDetailsDataService.create('materials', newData).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: {
    dimensionsList: [],
    brandsList:[],
    materialsList:[],
    isLoading: true,
    hasError: false
  },
  reducers: {
  },
  extraReducers: {
    [loadDimensions.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadDimensions.fulfilled]: (state, action) => {
      state.dimensionsList = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadDimensions.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteDimension.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteDimension.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.dimensionsList = deleteById(action.payload.id, state.dimensionsList);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteDimension.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [addDimension.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addDimension.fulfilled]: (state, action) => {
      state.dimensionsList.push(action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [addDimension.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadBrands.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadBrands.fulfilled]: (state, action) => {
      state.brandsList = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadBrands.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteBrand.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteBrand.fulfilled]: (state, action) => {
      state.brandsList = deleteById(action.payload.id, state.brandsList);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [addBrand.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.brandsList.push(action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [addBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [loadMaterials.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadMaterials.fulfilled]: (state, action) => {
      state.materialsList = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadMaterials.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteMaterial.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteMaterial.fulfilled]: (state, action) => {
      state.materialsList = deleteById(action.payload.id, state.brandsList);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteMaterial.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [addMaterial.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addMaterial.fulfilled]: (state, action) => {
      state.materialsList.push(action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [addMaterial.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectDimensions = (state) => {
  return state.productDetails.dimensionsList;
}
export const selectBrands = (state) => {
  return state.productDetails.brandsList;
}
export const selectMaterials = (state) => {
  return state.productDetails.materialsList;
}

export default productDetailsSlice.reducer;
