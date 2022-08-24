import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectSearchTerm, setSearchTerm} from './categoriesSlice';
import CategoresList from './CategoriesList';
import Box from '@mui/material/Box';
import CategoryDetails from './CategoryDetails'
import CategoryToolbar from '../../../components/CategoryToolbar';

const Categories = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchTerm);
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
  return (
    <main>
      <Box>
        <CategoryToolbar
          searchTerm={searchText}
          handleSearchTerm={handleSearchTerm}
          handleDialog={handleDialog}
          />
      </Box>
      <Box>
        <CategoresList
          handleDialog={handleDialog}
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
