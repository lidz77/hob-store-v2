import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const CategoryDetails = ({
  open,
  handleDialog,
  categoryDetails,
  handleAdd,
  handleUpdate,
  editMode,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);

  const clearDetailsAndCloseDialog = () => {
    setName('');
    setDescription('');
    setPublished(false);
    handleDialog(false);
  }

  useEffect(() => {
    setName(categoryDetails.name);
    setDescription(categoryDetails.description);
    setPublished(categoryDetails.published);
  }, [categoryDetails, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      name: name,
      description: description,
      published: published
    };
    if(editMode){
      handleUpdate({id : categoryDetails.id, data :details});
    }else{
      handleAdd(details);
    }
    clearDetailsAndCloseDialog();
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
        {categoryDetails.length === 0 ? 'Edit category' : 'Add new category' }
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={clearDetailsAndCloseDialog}
          >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
        <form id="category-details"
          onSubmit={handleSubmit}
          >
        <Box sx={{flexGrow : 1}} />
        <FormGroup>
        <FormControl>
          <InputLabel htmlFor="category-name">Name: </InputLabel>
          <Input
            id="category-name"
            aria-describedby="my-helper-text"
            value={name || ''}
            onChange={(e) => setName(e.target.value)}
            required
            />
        </FormControl>
        <Box sx={{flexGrow : 5}} />
        <FormControl>
            <InputLabel htmlFor="category-description">Description</InputLabel>
            <Input
              id="category-description"
              aria-describedby="my-helper-text"
              value={description || ''}
              onChange={(e)=> setDescription(e.target.value)}
              />
        </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={published || false}
                onChange={()=>setPublished(!published)}
                />} label="Publised" />
        <FormControl>
            <BottomNavigation
              showLabels
              >
              <BottomNavigationAction label="Done"
                type="submit"
                icon={<DoneIcon />} />
              <BottomNavigationAction
                onClick={clearDetailsAndCloseDialog}
                label="Cancel" icon={<CloseIcon />} />
            </BottomNavigation>
        </FormControl>
      </FormGroup>
    </form>
  </Dialog>
  )
}

export default CategoryDetails
