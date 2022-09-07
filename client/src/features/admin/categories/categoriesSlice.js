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
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (newCategoryInfo) => {
    const res = await CategoriesDataService.create(newCategoryInfo).then((result) => {
      return result.data;
    }).catch((err) => {
      console.log(err)
    });
    return res;
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (idArray) => {
    console.log(idArray)
    const res = await CategoriesDataService.delete(idArray).then((result) => {
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
    searchTerm: '',
    selectedItems: []
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectItem: (state, action) => {
      state.selectedItems.includes(action.payload) ? state.selectedItems =  state.selectedItems.filter(item => item !== action.payload) : state.selectedItems.push(action.payload);
    }

  },
  extraReducers: {
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
    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.categoriesList.push(action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
    [deleteCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteCategory.fulfilled]: (state, action) => {
      // loadCategories();
      console.log(action.payload.idArray);
      state.categoriesList = state.categoriesList.filter(item => !action.payload.idArray.includes(item.id));
      console.log(state.categoriesList);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  }
});



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

export const selectedItemsList = (state) => {
  return state.categories.selectedItems;
}

export const {
  setSearchTerm,
  selectItem
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
