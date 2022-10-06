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
import ProductProperties from '../../../components/ProductProperties'

import {addProduct} from './productsSlice'

const ProductDetails = ({
  loadDimensions,
  dimensionsList,
  deleteDimension,
  addDimension,
  loadBrands,
  brandsList,
  deleteBrand,
  addBrand,
  loadMaterials,
  materialsList,
  deleteMaterial,
  addMaterial,
  openDialog,
  handleDialog,
  handleAddProduct
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [available, setAvailable] = useState(false);
  const [dimensionId, setDimensionId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [materialId, setMaterialId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct({
      dimensionId: dimensionId,
      title: title,
      description: description,
      available: available,
      brandId: brandId,
      materialId: materialId
    });
    setTitle('');
    setDescription('');
    setAvailable(false);
    setDimensionId(null);
    setBrandId(null);
    setMaterialId(null);
    handleDialog(false);
  }

  const handlePickDimension = (id) => {
    setDimensionId(id);
  }
  const handlePickBrand = (id) => {
    setBrandId(id);
  }
  const handlePickMaterial = (id) => {
    setMaterialId(id);
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
         `Add new product`
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
                checked={available || false}
                onChange={()=>setAvailable(!available)}
                />} label="Available"
            />
          <ProductProperties
            loadingList={loadDimensions}
            propsList={dimensionsList}
            deleteProp={deleteDimension}
            addProp={addDimension}
            handlePickProp={handlePickDimension}
            propName="Dimension"
            />
          <ProductProperties
            loadingList={loadBrands}
            propsList={brandsList}
            deleteProp={deleteBrand}
            addProp={addBrand}
            handlePickProp={handlePickBrand}
            propName="Brand"
            />
          <ProductProperties
            loadingList={loadMaterials}
            propsList={materialsList}
            deleteProp={deleteMaterial}
            addProp={addMaterial}
            handlePickProp={handlePickMaterial}
            propName="Material"
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
  loadBrands: PropTypes.func,
  brandsList: PropTypes.array,
  deleteBrand: PropTypes.func,
  addBrand: PropTypes.func,
  loadMaterials: PropTypes.func,
  materialsList: PropTypes.array,
  deleteMaterial: PropTypes.func,
  addMaterial: PropTypes.func,
  openDialog: PropTypes.bool,
  handleDialog: PropTypes.func,
  handleAddProduct: PropTypes.func
}

export default ProductDetails
