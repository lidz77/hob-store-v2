import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import ProductToolbar from '../../../components/ProductToolbar';
import ProductDetails from './ProductDetails';
import ProductsList from './ProductsList'
import {
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
} from './productDetailsSlice';
import {
  loadProducts,
  isLoadingProducts,
  selectVisibleProducts,
  createProduct,
  setSearchTerm,
} from './productsSlice'

const Products = () => {
  const dispatch = useDispatch();
  const dimensionsList = useSelector(selectDimensions);
  const brandsList = useSelector(selectBrands);
  const materialsList = useSelector(selectMaterials);
  const [openDialog, setOpenDialog] = useState(false);
  const productsIsLoading = useSelector(isLoadingProducts);
  const filteredProductsList = useSelector(selectVisibleProducts);
  const handleDialog = () => {
    setOpenDialog(!openDialog);
  }

  const handleAddProduct = (newProductInfo) => {
    dispatch(createProduct(newProductInfo));
  }

  return (
    <main>
      <ProductToolbar
        handleDialog={handleDialog}
        setSearchTerm={setSearchTerm}
        />
      <ProductDetails
        openDialog={openDialog}
        loadDimensions={loadDimensions}
        dimensionsList={dimensionsList}
        deleteDimension={deleteDimension}
        addDimension={addDimension}
        loadBrands={loadBrands}
        brandsList={brandsList}
        deleteBrand={deleteBrand}
        addBrand={addBrand}
        loadMaterials={loadMaterials}
        materialsList={materialsList}
        deleteMaterial={deleteMaterial}
        addMaterial={addMaterial}
        handleDialog={handleDialog}
        handleAddProduct={handleAddProduct}
        />
      <ProductsList
        productsIsLoading={productsIsLoading}
        loadProducts={loadProducts}
        filteredProductsList={filteredProductsList}
        />
    </main>
  )
}

export default Products
