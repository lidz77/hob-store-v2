import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import DimensionsDataService from '../../../services/products/dimensions.services';


const deleteById = (id, objectsArray) => {
  objectsArray.splice(objectsArray.findIndex(i => i.id === id), 1);
  return objectsArray;
}

export const loadDimensions = createAsyncThunk(
  'products/dimensions/loadDimensions',
  async () => {
    const res = await DimensionsDataService.getAll().then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
);

export const deleteDimension = createAsyncThunk(
  '/products/dimensions/deleteDimension',
  async (id) => {
    const res = await DimensionsDataService.delete(id).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
);

export const addDimension = createAsyncThunk(
  '/products/dimensions/addDimension',
  async (newDimension) => {
    const res = await DimensionsDataService.create(newDimension).then((result) => {
      console.log(result);
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const dimensionsSlice = createSlice({
  name: 'categories',
  initialState: {
    dimensionsList: [],
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
  },
});

export const selectDimensions = (state) => {
  return state.dimensions.dimensionsList;
}

export default dimensionsSlice.reducer;
