import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
        deleteCategory,
        selectSearchTerm,
        setSearchTerm,
        selectVisibleCategories,
        loadCategories,
        isLoadingCategories,
        selectItem,
        selectedItemsList
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
  const [openDialog, setOpenDialog] = useState(false);
  const [info, setInfo] = useState({});
  const handleDialog = (editMode) => {
    if(editMode){
      setInfo({})
    }
    setOpenDialog(!openDialog);
  }

  const handleSearchTerm = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }

  const handleDelete = (idArray) => {
    if(!Array.isArray(idArray)){
      idArray = [idArray];
    }
    dispatch(deleteCategory(idArray));
  }

  const handleSelectItem = (item) => {
    dispatch(selectItem(item));
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
          />
      </Box>
      <Box>
        <CategoresList
          loadCategories={loadCategories}
          filteredCategoriesList={filteredCategoriesList}
          handleDialog={handleDialog}
          handleDelete={handleDelete}
          categoriesIsLoading={categoriesIsLoading}
          handleSelectItem={handleSelectItem}
          />
      </Box>
      <CategoryDetails
        open={openDialog}
        handleDialog={handleDialog}
        onSucceed={() => setOpenDialog(false)}
        info={info}
        />
    </main>
  )
}


export default Categories
