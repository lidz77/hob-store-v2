import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import PostAddIcon from '@mui/icons-material/PostAdd';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCategory from '../features/admin/categories/AddCategory';
import BasicToolbar from './BasicToolbar';

import {selectSearchTerm, setSearchTerm} from '../features/admin/categories/categoriesSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  padding:2,
};

const Search = styled('div')(({theme}) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyleInputBase = styled(InputBase)(({theme}) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    },
  },
}));

const CategoryToolbar = () => {
  const dispatch = useDispatch();
  const searchText = useSelector(selectSearchTerm);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModal = () => {
    setModalOpen(!modalOpen);
  }
  const handleChangeText = (e) => {
    dispatch(setSearchTerm(e.target.value));
  }

  return (
    <Box>
      <Toolbar position="static">
        <Box sx={{flexGrow : 1}} />
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
          <IconButton
            size="large"
            aria-label="Add new category"
            color="inherit"
            onClick={handleModal}
            >
            <PostAddIcon />
          </IconButton>
          <Modal
            open={modalOpen}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
              <BasicToolbar
                title={'Add new category'}
                onCloseButton={() => setModalOpen(false)}
                />
              <AddCategory
                title={'Add new category'}
                />
            </Box>
          </Modal>
        </Box>
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
          <IconButton
            size="large"
            aria-label="Edit category"
            color="inherit"
            >
            <ModeIcon />
          </IconButton>
        </Box>
        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
          <IconButton
            size="large"
            aria-label="Delete category"
            color="inherit"
            >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyleInputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search'}}
            value={searchText}
            onChange={handleChangeText}
            />
        </Search>
      </Toolbar>
    </Box>
  )
}

export default CategoryToolbar
