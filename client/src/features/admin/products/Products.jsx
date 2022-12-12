import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductToolbar from "../../../components/admin/ProductToolbar";
import ProductDetails from "./ProductDetails";
import ProductsList from "./ProductsList";
import {
  loadProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  isLoadingProducts,
  selectVisibleProducts,
  setSearchTerm,
  selectProductDetails,
  selectItem,
  selectedItems,
  findProductDetails,
} from "./productsSlice";
import {
  loadCategories,
  selectCategories,
} from "../categories/categoriesSlice";
import {
  isLoadingProps,
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
  uploadImages,
  selectImagesInfo,
  setImagesInfo,
  clearImagesInfo,
  removeImageInfo,
  selectImagesIdsArray,
  selectImages,
} from "./productPropsSlice";

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
    console.log("load props succeed");
  }, [dispatch]);

  const handleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleAddProduct = (newProductInfo) => {
    dispatch(createProduct(newProductInfo));
  };

  const handleUpdateProduct = (id, data) => {
    dispatch(updateProduct(id, data));
  };

  const handleSetProductDetails = (id) => {
    dispatch(findProductDetails(id));
  };

  const handleSelectItem = (item) => {
    dispatch(selectItem(item));
  };

  const handleDeleteProduct = (idArray) => {
    if (!Array.isArray(idArray)) {
      idArray = [idArray];
    }
    dispatch(deleteProduct(idArray));
  };

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
        handleSetProductDetails={handleSetProductDetails}
        setEditMode={setEditMode}
        handleDialog={handleDialog}
        handleDeleteProduct={handleDeleteProduct}
        handleSelectItem={handleSelectItem}
      />
      <ProductDetails
        isLoadingProps={isLoadingProps}
        productsIsLoading={productsIsLoading}
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
        uploadImages={uploadImages}
        selectImagesInfo={selectImagesInfo}
        setImagesInfo={setImagesInfo}
        clearImagesInfo={clearImagesInfo}
        removeImageInfo={removeImageInfo}
        selectImagesIdsArray={selectImagesIdsArray}
        selectImages={selectImages}
      />
    </main>
  );
};

export default Products;
