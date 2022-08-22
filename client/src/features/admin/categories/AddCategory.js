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

const AddCategory = () => {
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
  )
}

export default AddCategory
