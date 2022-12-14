import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductPropsDataService from "../../../services/products/productprops.services";
import ProductImagesService from "../../../services/products/productimages.services";

const uploadSingle = async (files, ThunkAPI) => {
  let imgIdsArray = [];

  for (let i = 0; i < files.length; i++) {
    await ProductImagesService.uploadSingle(files[i], (e) => {
      ThunkAPI.dispatch(
        setProgressUpload({
          idx: i,
          percentage: Math.round((100 * e.loaded) / e.total),
        })
      );
    })
      .then((result) => {
        imgIdsArray = [...imgIdsArray, result.data.id];
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return Promise.all(imgIdsArray);
};

export const uploadImages = createAsyncThunk(
  "products/productProps/uploadImages",
  async (files, ThunkAPI) => {
    const res = await uploadSingle(files, ThunkAPI)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
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
);

const deleteById = (id, objectsArray) => {
  objectsArray.splice(
    objectsArray.findIndex((i) => i.id === id),
    1
  );
  return objectsArray;
};

export const loadImages = createAsyncThunk(
  "products/productProps/loadImages",
  async (productId) => {
    console.log(productId);
    const res = await ProductPropsDataService.getByProductId(
      "images",
      productId
    )
      .then((result) => {
        console.log(result);
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
    return res;
  }
);

export const loadDimensions = createAsyncThunk(
  "products/productProps/loadDimensions",
  async () => {
    const res = await ProductPropsDataService.getAll("dimensions")
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const deleteDimension = createAsyncThunk(
  "products/productProps/deleteDimension",
  async (id) => {
    const res = await ProductPropsDataService.delete("dimensions", id)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const addDimension = createAsyncThunk(
  "products/productProps/addDimension",
  async (newData) => {
    const res = await ProductPropsDataService.create("dimensions", newData)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);
export const loadBrands = createAsyncThunk(
  "products/productProps/loadBrands",
  async () => {
    const res = await ProductPropsDataService.getAll("brands")
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const deleteBrand = createAsyncThunk(
  "products/productProps/deleteBrand",
  async (id) => {
    const res = await ProductPropsDataService.delete("brands", id)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const addBrand = createAsyncThunk(
  "products/productProps/addBrand",
  async (newData) => {
    const res = await ProductPropsDataService.create("brands", newData)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const loadMaterials = createAsyncThunk(
  "products/productProps/loadMaterials",
  async () => {
    const res = await ProductPropsDataService.getAll("materials")
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const deleteMaterial = createAsyncThunk(
  "products/productProps/deleteMaterial",
  async (id) => {
    const res = await ProductPropsDataService.delete("materials", id)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const addMaterial = createAsyncThunk(
  "products/productProps/addMaterial",
  async (newData) => {
    const res = await ProductPropsDataService.create("materials", newData)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

const productPropsSlice = createSlice({
  name: "productProps",
  initialState: {
    dimensionsList: [],
    brandsList: [],
    materialsList: [],
    imagesList: [],
    imagesInfo: [], //for uploading image
    imageIdsArray: [], // for uploading image
    isLoading: true,
    hasError: false,
  },
  reducers: {
    removeImageInfo: (state, action) => {
      console.log(action.payload);
      state.imagesInfo = state.imagesInfo.filter((item, index) => {
        return index !== action.payload;
      });
    },
    setProgressUpload: (state, action) => {
      const payload = action.payload;
      state.imagesInfo[payload.idx].percentage = payload.percentage;
    },
    setImagesInfo: (state, action) => {
      // state.imagesInfo = action.payload;
      state.imagesInfo.push(action.payload);
    },
    clearImagesInfo: (state) => {
      state.imagesInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadImages.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadImages.fulfilled, (state, action) => {
        state.imagesList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadDimensions.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadDimensions.fulfilled, (state, action) => {
        state.dimensionsList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadDimensions.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteDimension.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteDimension.fulfilled, (state, action) => {
        console.log(action.payload);
        state.dimensionsList = deleteById(
          action.payload.id,
          state.dimensionsList
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteDimension.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addDimension.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addDimension.fulfilled, (state, action) => {
        state.dimensionsList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addDimension.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadBrands.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadBrands.fulfilled, (state, action) => {
        state.brandsList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteBrand.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brandsList = deleteById(action.payload.id, state.brandsList);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addBrand.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.brandsList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(loadMaterials.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadMaterials.fulfilled, (state, action) => {
        state.materialsList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteMaterial.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteMaterial.fulfilled, (state, action) => {
        state.materialsList = deleteById(action.payload.id, state.brandsList);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addMaterial.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addMaterial.fulfilled, (state, action) => {
        state.materialsList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addMaterial.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(uploadImages.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        console.log(action.payload);
        state.imageIdsArray = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const isLoadingProps = (state) => {
  return state.productProps.isLoading;
};

export const selectDimensions = (state) => {
  return state.productProps.dimensionsList;
};
export const selectBrands = (state) => {
  return state.productProps.brandsList;
};
export const selectMaterials = (state) => {
  return state.productProps.materialsList;
};
export const selectImages = (state) => {
  return state.productProps.imagesList;
};
export const selectImagesInfo = (state) => {
  return state.productProps.imagesInfo;
};
export const selectImagesIdsArray = (state) => {
  return state.productProps.imageIdsArray;
};

export const {
  setImagesInfo,
  clearImagesInfo,
  setProgressUpload,
  removeImageInfo,
} = productPropsSlice.actions;

export default productPropsSlice.reducer;
