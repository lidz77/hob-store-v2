import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import CategoriesDataService from '../../../services/categories.services';


export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    const res = await CategoriesDataService.getAll().then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err);
    });
    return res;
  }
)

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    newCategoryInfo: {},
    categoriesList: [],
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
    // [addCategory.pending]: (state, action) => {
    //   state.isLoading = true;
    //   state.hasError = false;
    // },
    // [addCategory.fulfilled]: (state, action) => {
    //   state.newCategoryInfo.push(action.payload);
    //   state.isLoading = false;
    //   state.hasError = false;
    // },
    // [addCategory.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = true;
    // },
    [loadCategories.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCategories.fulfilled]: (state, action) => {
      state.categoriesList = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [loadCategories.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
  }
});


export const {setSearchTerm} = categoriesSlice.actions;

export const selectSearchTerm = (state) => {
  return state.categories.searchTerm;
}
export const isLoadingCategories = (state) => {
  return state.categories.isLoading;
}
export const selectCategories = (state) => {
  return state.categories.categoriesList;
}
export const selectVisibleCategories = (state) => {
  return state.categories.categoriesList.filter(item => item.title.toLowerCase().includes(state.categories.searchTerm.toLowerCase()));
}

export default categoriesSlice.reducer;
