import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import BasicToolbar from '../../../components/BasicToolbar';
import Fab from '@mui/material/Fab';
import DoneIcon from '@mui/icons-material/Done';

const AddCategory = () => {
  return (
    <form id="add-category">
      <BasicToolbar
        title={'Add new Category'}
        />
      <Box sx={{flexGrow : 1}} />
      <FormControl>
        <InputLabel htmlFor="category-name">Name: </InputLabel>
        <Input id="category-name" aria-describedby="my-helper-text" />
      </FormControl>
      <Box sx={{flexGrow : 5}} />
      <FormControl>
        <FormGroup>
          <InputLabel htmlFor="category-description">Description</InputLabel>
          <Input id="category-description" aria-describedby="my-helper-text" />
        </FormGroup>
      </FormControl>
      <FormControl>
        <Fab>
          <DoneIcon color="secondary" />
        </Fab>
      </FormControl>
    </form>
  )
}

export default AddCategory
