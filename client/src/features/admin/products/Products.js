import React,{useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ProductToolbar from '../../../components/ProductToolbar';
import ProductDetails from './ProductDetails';
import ProductsList from './ProductsList';
import {
  loadProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  isLoadingProducts,
  selectVisibleProducts,
  setSearchTerm,
  selectProductDetails,
  setProductDetails,
  selectItem,
  selectedItems
} from './productsSlice';
import {
  loadCategories,
  selectCategories
} from '../categories/categoriesSlice';
import{
  loadDimensions,
  selectDimensions,
  deleteDimension,
  addDimension,
  loadBrands,
  selectBrands,
  deleteBrand,
  addBrand,
  loadMaterials,
  selectMaterials,
  deleteMaterial,
  addMaterial,
} from '../products/productPropsSlice'

const Products = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(selectProductDetails);
  const productsIsLoading = useSelector(isLoadingProducts);
  const filteredProductsList = useSelector(selectVisibleProducts);
  const selectedItemsList = useSelector(selectedItems);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCategories());
    dispatch(loadDimensions());
    dispatch(loadBrands());
    dispatch(loadMaterials());
    console.log('load props succeed');
  }, [dispatch])

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }

  const handleAddProduct = (newProductInfo) => {
    dispatch(createProduct(newProductInfo));
  }

  const handleUpdateProduct = (id, data) => {
    dispatch(updateProduct(id, data));
  }

  const handleSetProductDetails = (item) => {
    dispatch(setProductDetails(item));
  }

  const handleSelectItem = (item) => {
    dispatch(selectItem(item));
  }

  const handleDeleteProduct = (idArray) => {
    if(!Array.isArray(idArray)){
      idArray = [idArray];
    }
    dispatch(deleteProduct(idArray));
  }

  return (
    <main>
      <ProductToolbar
        handleDialog={handleDialog}
        setSearchTerm={setSearchTerm}
        handleDeleteProduct={handleDeleteProduct}
        selectedItemsList={selectedItemsList}
        />
      <ProductsList
        productsIsLoading={productsIsLoading}
        filteredProductsList={filteredProductsList}
        setProductDetails={setProductDetails}
        handleSetProductDetails={handleSetProductDetails}
        setEditMode={setEditMode}
        handleDialog={handleDialog}
        handleDeleteProduct={handleDeleteProduct}
        handleSelectItem={handleSelectItem}
        />
      <ProductDetails
        openDialog={openDialog}
        handleDialog={handleDialog}
        handleAddProduct={handleAddProduct}
        onSucceed={() => setOpenDialog(false)}
        setEditMode={setEditMode}
        editMode={editMode}
        productDetails={productDetails}
        handleUpdateProduct={handleUpdateProduct}
        handleSetProductDetails={handleSetProductDetails}
        selectDimensions={selectDimensions}
        deleteDimension={deleteDimension}
        addDimension={addDimension}
        selectBrands={selectBrands}
        deleteBrand={deleteBrand}
        addBrand={addBrand}
        selectMaterials={selectMaterials}
        deleteMaterial={deleteMaterial}
        addMaterial={addMaterial}
        selectProductDetails={selectProductDetails}
        selectCategories={selectCategories}
        />
    </main>
  )
}

export default Products
