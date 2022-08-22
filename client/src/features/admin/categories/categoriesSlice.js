import {createSlice} from '@reduxjs/toolkit';


const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categoryInfo: [],
    isLoading: true,
    hasError: false
  },
  reducers: {

  },
  extraReducers: {
    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addCategory.pending]: (state, action) => {
      state.categoryInfo.push(action.payload);
      state.isLoading = true;
      state.hasError = false;
    },
    [addCategory.pending]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  }
});

export default categoriesSlice.reducer;
