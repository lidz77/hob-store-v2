import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
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
import Dimensions from './Dimensions'

import {addProduct} from './productsSlice'

const ProductDetails = ({
  loadDimensions,
  dimensionsList,
  deleteDimension,
  addDimension,
  openDialog,
  handleDialog,
  handleAddProduct
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [dimensionId, setDimensionId] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(addProduct({
    //   dimensionId: dimensionId,
    //   title: title,
    //   description: description,
    //   published: published
    // }))
    handleAddProduct({
      dimensionId: dimensionId,
      title: title,
      description: description,
      published: published
    });
  }

  const handlePickDimension = (id) => {
    setDimensionId(id);
  }

  return (
    <Dialog
      open={openDialog}
      >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          padding: (theme) => theme.spacing(2),
        }}
        >
         'Add new product'
        <IconButton
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={()=> handleDialog()}
          >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form id="product-details"
        onSubmit={handleSubmit}
        >
        <Box sx={{flexGrow : 1}} />
        <FormGroup>
        <FormControl>
          <InputLabel htmlFor="product-name">Name: </InputLabel>
          <Input
            id="product-name"
            aria-describedby="my-helper-text"
            required
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            />
        </FormControl>
        <Box sx={{flexGrow : 5}} />
        <FormControl>
            <InputLabel htmlFor="product-description">Description</InputLabel>
            <Input
              id="product-description"
              aria-describedby="my-helper-text"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              />
        </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={published || false}
                onChange={()=>setPublished(!published)}
                />} label="Publised"
            />
          <Dimensions
            loadDimensions={loadDimensions}
            dimensionsList={dimensionsList}
            deleteDimension={deleteDimension}
            addDimension={addDimension}
            handlePickDimension = {handlePickDimension}
            setDimensionId={setDimensionId}
            />
        <FormControl>
            <BottomNavigation
              showLabels
              >
              <BottomNavigationAction label="Done"
                type="submit"
                icon={<DoneIcon />} />
              <BottomNavigationAction
                onClick={()=>handleDialog()}
                label="Cancel" icon={<CloseIcon />} />
            </BottomNavigation>
        </FormControl>
        </FormGroup>
      </form>
    </Dialog>
  )
}
ProductDetails.propTypes = {
  loadDimensions: PropTypes.func,
  dimensionsList: PropTypes.array,
  deleteDimension: PropTypes.func,
  addDimension: PropTypes.func,
}

export default ProductDetails
