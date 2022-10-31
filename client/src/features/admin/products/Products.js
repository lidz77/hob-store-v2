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
} from './productsSlice'

const Products = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(selectProductDetails);
  const productsIsLoading = useSelector(isLoadingProducts);
  const filteredProductsList = useSelector(selectVisibleProducts);

  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
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
        />
      <ProductsList
        productsIsLoading={productsIsLoading}
        loadProducts={loadProducts}
        filteredProductsList={filteredProductsList}
        setProductDetails={setProductDetails}
        handleSetProductDetails={handleSetProductDetails}
        setEditMode={setEditMode}
        handleDialog={handleDialog}
        handleDeleteProduct={handleDeleteProduct}
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
        />
    </main>
  )
}

export default Products
