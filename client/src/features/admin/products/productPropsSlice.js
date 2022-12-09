import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ProductPropsDataService from '../../../services/products/productprops.services';
import ProductImagesService from '../../../services/products/productimages.services';

const uploadSingle = async (files, ThunkAPI) => {
  let imgIdsArray = [];

  for(let i = 0; i< files.length; i++){
    await ProductImagesService.uploadSingle(files[i], (e) => {
      ThunkAPI.dispatch(setProgressUpload({
        idx: i,
        percentage: Math.round((100*e.loaded) /e.total)
      }));
    }).then((result) => {
      imgIdsArray = [...imgIdsArray, result.data.id];
    }).catch((err) => {
      console.log(err);
    });
  }
  return Promise.all(imgIdsArray);
}

export const uploadImages = createAsyncThunk(
  'products/productProps/uploadImages',
  async (files, ThunkAPI) => {
    const res = await uploadSingle(files, ThunkAPI).then((result) => {
      return result;
    }).catch((err) => {
      console.log(err)
    });
    return res;
    //upload multiple files at once
    // ProductImagesService.uploadMultiple(files, (e) => {
    //   console.log(e);
    // }).then((result) => {
    //   return result.data;
    // }).catch((err) => {
    //   console.log(err);
    // });
  }
)

const deleteById = (id, objectsArray) => {
  objectsArray.splice(objectsArray.findIndex(i => i.id === id), 1);
  return objectsArray;
}

export const loadDimensions = createAsyncThunk(
  'products/productProps/loadDimensions',
  async () => {
    const res = await ProductPropsDataService.getAll('dimensions').then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteDimension = createAsyncThunk(
  'products/productProps/deleteDimension',
  async (id) => {
    const res = await ProductPropsDataService.delete('dimensions', id).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addDimension = createAsyncThunk(
  'products/productProps/addDimension',
  async (newData) => {
    const res = await ProductPropsDataService.create('dimensions', newData).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)
export const loadBrands = createAsyncThunk(
  'products/productProps/loadBrands',
  async () => {
    const res = await ProductPropsDataService.getAll('brands').then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteBrand = createAsyncThunk(
  'products/productProps/deleteBrand',
  async (id) => {
    const res = await ProductPropsDataService.delete('brands', id).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addBrand = createAsyncThunk(
  'products/productProps/addBrand',
  async (newData) => {
    const res = await ProductPropsDataService.create('brands', newData).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

export const loadMaterials = createAsyncThunk(
  'products/productProps/loadMaterials',
  async () => {
    const res = await ProductPropsDataService.getAll('materials').then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteMaterial = createAsyncThunk(
  'products/productProps/deleteMaterial',
  async (id) => {
    const res = await ProductPropsDataService.delete('materials', id).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addMaterial = createAsyncThunk(
  'products/productProps/addMaterial',
  async (newData) => {
    const res = await ProductPropsDataService.create('materials', newData).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const productPropsSlice = createSlice({
  name: 'productProps',
  initialState: {
    dimensionsList: [],
    brandsList:[],
    materialsList:[],
    imagesList:[],
    imageIdsArray: [],
    isLoading: true,
    hasError: false
  },
  reducers: {
    removeImageFromList: (state, action) => {
      console.log(action.payload);
      state.imagesList = state.imagesList.filter((item, index) => { return index !== action.payload });
    },
    setProgressUpload: (state, action) => {
      const payload = action.payload;
      state.imagesList[payload.idx].percentage = payload.percentage;
    },
    setImagesList: (state, action) => {
      // state.imagesList = action.payload;
      state.imagesList.push(action.payload);
    },
    clearImagesList: (state) => {
      state.imagesList = [];
    }
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
    [uploadImages.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [uploadImages.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.imageIdsArray = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [uploadImages.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const selectImages = (state) => {
  return state.productProps.imagesList;
}

export const selectDimensions = (state) => {
  return state.productProps.dimensionsList;
}
export const selectBrands = (state) => {
  return state.productProps.brandsList;
}
export const selectMaterials = (state) => {
  return state.productProps.materialsList;
}
export const selectImagesList = (state) => {
  return state.productProps.imagesList;
}
export const selectImagesIdsArray = (state) => {
  return state.productProps.imageIdsArray;
}

export const {
  setImagesList,
  clearImagesList,
  setProgressUpload,
  removeImageFromList
} = productPropsSlice.actions;

export default productPropsSlice.reducer;
