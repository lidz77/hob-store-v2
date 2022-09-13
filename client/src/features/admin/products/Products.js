import React from 'react';
import {useSelector} from 'react-redux';
import ProductToolbar from '../../../components/ProductToolbar';
import ProductDetails from './ProductDetails';
import {
  loadDimensions,
  selectDimensions,
  deleteDimension,
  addDimension,
} from './dimensionsSlice';

const Products = () => {
  const dimensionsList = useSelector(selectDimensions);

  return (
    <main>
      <ProductToolbar />
      <ProductDetails
        loadDimensions={loadDimensions}
        dimensionsList={dimensionsList}
        deleteDimension={deleteDimension}
        addDimension={addDimension}
        />
    </main>
  )
}

export default Products
