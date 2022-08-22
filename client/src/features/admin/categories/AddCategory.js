import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addCategory} from './categoriesSlice';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const AddCategory = ({open, handleDialog}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCategory({
      title: title,
      description: description
    }))
  }
  return (
    <Dialog
      open={open}
      >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          padding: (theme) => theme.spacing(2),
        }}
        >
        Add new category
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={handleDialog}
          >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <form id="add-category"
          onSubmit={handleSubmit}
          >
        <Box sx={{flexGrow : 1}} />
        <FormControl>
          <InputLabel htmlFor="category-name">Name: </InputLabel>
          <Input
            id="category-name"
            aria-describedby="my-helper-text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            />
        </FormControl>
        <Box sx={{flexGrow : 5}} />
        <FormControl>
          <FormGroup>
            <InputLabel htmlFor="category-description">Description</InputLabel>
            <Input
              id="category-description"
              aria-describedby="my-helper-text"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              />
          </FormGroup>
        </FormControl>
        <FormControl>
          <Fab type="submit">
            <DoneIcon color="secondary" />
          </Fab>
        </FormControl>
    </form>
  </Dialog>
  )
}

export default AddCategory
