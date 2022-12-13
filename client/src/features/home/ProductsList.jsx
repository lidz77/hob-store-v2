import React, { useState } from "react";
import PropTypes from "prop-types";
import FilterBox from "../../components/home/FilterBox";
import { Grid } from "@mui/material";
import { loadCategories } from "../admin/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../admin/categories/categoriesSlice";
import {
  loadBrands,
  loadDimensions,
  selectBrands,
  selectDimensions,
} from "../admin/products/productPropsSlice";

const ProductsList = (props) => {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategories);
  const dimensionsList = useSelector(selectDimensions);
  const brandsList = useSelector(selectBrands);
  const handleLoadFilterOptions = () => {
    dispatch(loadCategories());
    dispatch(loadDimensions());
    dispatch(loadBrands());
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <FilterBox
          handleLoadFilterOptions={handleLoadFilterOptions}
          categoriesList={categoriesList}
          dimensionsList={dimensionsList}
          brandsList={brandsList}
        />
      </Grid>
      <Grid item xl={10}>
        images list goes there
      </Grid>
    </Grid>
  );
};
ProductsList.propTypes = {};

export default ProductsList;
