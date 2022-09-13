import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
        deleteCategory,
        setSearchTerm,
        selectVisibleCategories,
        selectedItemsList,
        selectCategoryDetails,
        selectSearchTerm,
        loadCategories,
        isLoadingCategories,
        selectItem,
        setCategoryDetails,
        updateCategory,
        addCategory,
      } from './categoriesSlice';
import CategoresList from './CategoriesList';
import Box from '@mui/material/Box';
import CategoryDetails from './CategoryDetails'
import CategoryToolbar from '../../../components/CategoryToolbar';

const Categories = () => {
  const dispatch = useDispatch();
  const filteredCategoriesList = useSelector(selectVisibleCategories);
  const searchText = useSelector(selectSearchTerm);
  const categoriesIsLoading = useSelector(isLoadingCategories);
  const selectedItems = useSelector(selectedItemsList);
  const categoryDetails = useSelector(selectCategoryDetails);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handleAdd = (data) => {
    dispatch(addCategory(data));
  }

  const handleUpdate = (id, data) => {
    dispatch(updateCategory(id, data))
  }

  const handleDelete = (idArray) => {
    if(!Array.isArray(idArray)){
      idArray = [idArray];
    }
    dispatch(deleteCategory(idArray));
  }

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }

  const handleSearchTerm = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }


  const handleSelectItem = (item) => {
    dispatch(selectItem(item));
  }

  const handleSetDetails = (item) => {
    dispatch(setCategoryDetails(item));
  }

  return (
    <main>
      <Box>
        <CategoryToolbar
          searchTerm={searchText}
          handleSearchTerm={handleSearchTerm}
          handleDialog={handleDialog}
          handleDelete={handleDelete}
          selectedItems={selectedItems}
          setEditMode={setEditMode}
          />
      </Box>
      <Box>
        <CategoresList
          loadCategories={loadCategories}
          filteredCategoriesList={filteredCategoriesList}
          categoriesIsLoading={categoriesIsLoading}
          handleDialog={handleDialog}
          handleDelete={handleDelete}
          handleSelectItem={handleSelectItem}
          handleSetDetails={handleSetDetails}
          setEditMode={setEditMode}
          />
      </Box>
      <CategoryDetails
        open={openDialog}
        handleDialog={handleDialog}
        onSucceed={() => setOpenDialog(false)}
        categoryDetails={categoryDetails}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        editMode={editMode}
        />
    </main>
  )
}


export default Categories
