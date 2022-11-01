import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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
import ProductProperties from '../../../components/ProductProperties';
import {CirclePicker} from 'react-color';


const ProductDetails = ({
  openDialog,
  handleDialog,
  handleAddProduct,
  handleUpdateProduct,
  handleSetProductDetails,
  setEditMode,
  editMode,
  selectProductDetails,
  selectDimensions,
  deleteDimension,
  addDimension,
  selectBrands,
  deleteBrand,
  addBrand,
  selectMaterials,
  deleteMaterial,
  addMaterial,
  selectCategories
}) => {
  const productDetails = useSelector(selectProductDetails);
  const dimensionsList = useSelector(selectDimensions);
  const brandsList = useSelector(selectBrands);
  const materialsList = useSelector(selectMaterials);
  const categoriesList = useSelector(selectCategories);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [dimensionId, setDimensionId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [materialId, setMaterialId] = useState(null);
  const [color, setColor] = useState('#f795548');


  const clearDetailsAndCloseDialog = () => {
    setEditMode(false);
    setTitle('');
    setDescription('');
    setAvailable(false);
    setCategoryId(null);
    setDimensionId(null);
    setBrandId(null);
    setMaterialId(null);
    setPrice(0);
    handleDialog(false);
    handleSetProductDetails({});
  }


  useEffect(() => {
    if(editMode){
      setTitle(productDetails.title);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setAvailable(productDetails.available);
      setDimensionId(productDetails.dimension ? productDetails.dimension.id : null);
      setCategoryId(productDetails.category ? productDetails.category.id : null);
      setBrandId(productDetails.brand ? productDetails.brand.id : null);
      setMaterialId(productDetails.material ? productDetails.brand.id : null);
      setColor(productDetails.color);
      setPrice(productDetails.price);
    }
  }, [productDetails])

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      title: title,
      description: description,
      available: available,
      dimensionId: dimensionId,
      brandId: brandId,
      materialId: materialId,
      categoryId: categoryId,
      price: price,
      color: color.hex
    }

    if(editMode){
      console.log(details);
      handleUpdateProduct({id: productDetails.id, data: details});
    }else{
      handleAddProduct(details);
    }

    clearDetailsAndCloseDialog();
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
  const handlePickCategory = (id) => {
    setCategoryId(id);
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
         Add new product {dimensionId}
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
              value={title || ''}
              onChange={(e)=>setTitle(e.target.value)}
              />
          </FormControl>
          <Box sx={{flexGrow : 5}} />
          <FormControl>
              <InputLabel htmlFor="product-description">Description</InputLabel>
              <Input
                id="product-description"
                aria-describedby="my-helper-text"
                value={description || ''}
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
            propsList={dimensionsList}
            deleteProp={deleteDimension}
            addProp={addDimension}
            handlePickProp={handlePickDimension}
            propName="Dimension"
            propDetails={productDetails.dimension ? productDetails.dimension : {}}
            />
          <ProductProperties
            propsList={brandsList}
            deleteProp={deleteBrand}
            addProp={addBrand}
            handlePickProp={handlePickBrand}
            propName="Brand"
            propDetails={productDetails.brand ? productDetails.brand : {}}
            />
          <ProductProperties
            propsList={materialsList}
            deleteProp={deleteMaterial}
            addProp={addMaterial}
            handlePickProp={handlePickMaterial}
            propName="Material"
            propDetails={productDetails.material ? productDetails.material : {}}
            />
          <ProductProperties
            propsList={categoriesList}
            handlePickProp={handlePickCategory}
            propName="Category"
            propDetails={productDetails.category ? productDetails.category : {}}
            />
            <FormControl>
                <InputLabel htmlFor="product-description">Price</InputLabel>
                <Input
                  id="product-price"
                  aria-describedby="my-helper-text"
                  value={price || 0}
                  onChange={(e)=>setPrice(e.target.value)}
                  />
            </FormControl>
          <CirclePicker
            color={color || "0fff"}
            onChange={(color)=> setColor(color) }
            />
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
