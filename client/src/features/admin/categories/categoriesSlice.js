import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesDataService from "../../../services/categories.services";

export const loadCategories = createAsyncThunk(
  "categories/loadCategories",
  async () => {
    const res = await CategoriesDataService.getAll()
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (newCategoryInfo) => {
    const res = await CategoriesDataService.create(newCategoryInfo)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (idArray) => {
    console.log(idArray);
    const res = await CategoriesDataService.delete(idArray)
      .then((result) => {
        return result.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }) => {
    const res = await CategoriesDataService.update(id, data)
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categoryDetails: {},
    categoriesList: [],
    isLoading: true,
    hasError: false,
    searchTerm: "",
    selectedItems: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectItem: (state, action) => {
      state.selectedItems.includes(action.payload)
        ? (state.selectedItems = state.selectedItems.filter(
            (item) => item !== action.payload
          ))
        : state.selectedItems.push(action.payload);
    },
    setCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.categoriesList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categoriesList.push(action.payload);
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categoriesList = state.categoriesList.filter(
          (item) => !action.payload.idArray.includes(item.id)
        );
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const res = action.payload.data;
        console.log(res);
        state.categoriesList = state.categoriesList.map((item) => {
          return item.id === res.id ? (item = res) : item;
        });
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const selectSearchTerm = (state) => {
  return state.categories.searchTerm;
};
export const isLoadingCategories = (state) => {
  return state.categories.isLoading;
};
export const selectCategories = (state) => {
  return state.categories.categoriesList;
};
export const selectVisibleCategories = (state) => {
  return state.categories.categoriesList.filter((item) =>
    item.name.toLowerCase().includes(state.categories.searchTerm.toLowerCase())
  );
};
export const selectCategoryDetails = (state) => {
  return state.categories.categoryDetails;
};

export const selectedItemsList = (state) => {
  return state.categories.selectedItems;
};

export const { setSearchTerm, selectItem, setCategoryDetails } =
  categoriesSlice.actions;

export default categoriesSlice.reducer;
