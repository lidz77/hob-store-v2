import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FilterBox from "../../components/home/FilterBox";
import { Grid, Pagination, Stack } from "@mui/material";
import { loadCategories } from "../admin/categories/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../admin/categories/categoriesSlice";
import {
  loadBrands,
  loadDimensions,
  selectBrands,
  selectDimensions,
} from "../admin/products/productPropsSlice";
import ProductCard from "../../components/home/ProductCard";
import {
  clientLoadProducts,
  selectClientProducts,
  selectPaging,
} from "../admin/products/productsSlice";

const ProductsList = (props) => {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategories);
  const dimensionsList = useSelector(selectDimensions);
  const brandsList = useSelector(selectBrands);
  const productsList = useSelector(selectClientProducts);
  const paging = useSelector(selectPaging);
  //filter state
  const [category, setCategory] = useState(0);
  const [dimension, setDimension] = useState(0);
  const [brand, setBrand] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    dispatch(loadCategories());
    dispatch(loadDimensions());
    dispatch(loadBrands());
  }, []);

  useEffect(() => {
    handleFilter();
  }, [pageNumber, handleFilter]);

  const handleFilter = () => {
    console.log(pageNumber);
    dispatch(
      clientLoadProducts({
        searchTerm: searchTerm,
        category: category,
        dimension: dimension,
        brand: brand,
        pageNumber: pageNumber,
      })
    );
  };

  const clearFilter = () => {
    setSearchTerm("");
    setCategory(0);
    setDimension(0);
    setBrand([]);
    setPageNumber(0);
    handleFilter();
  };

  return (
    <Grid maxWidth="xl" sx={{ flexGrow: 1, padding: "auto" }}>
      <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item sm={3}>
          <FilterBox
            categoriesList={categoriesList}
            dimensionsList={dimensionsList}
            brandsList={brandsList}
            handleFilter={handleFilter}
            brand={brand}
            setBrand={setBrand}
            dimension={dimension}
            setDimension={setDimension}
            category={category}
            setCategory={setCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearFilter={clearFilter}
          />
        </Grid>
        <Grid container item sm={9} spacing={1}>
          {productsList &&
            productsList.map((item, index) => {
              return (
                <Grid item key={index}>
                  <ProductCard
                    productName={item.title}
                    productPrice={item.price}
                    productBrand={item.brand}
                    productAlt={item.productImages.alt}
                    productUrl={`data:image;base64, ${item.productImages.url}`}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid container xl={12} alignItems="center" direction="column">
        <Stack spacing={2}>
          <Pagination
            count={paging.totalPages}
            color="secondary"
            page={pageNumber + 1}
            onChange={(e, page) => {
              console.log(page);
              try {
                setPageNumber(page - 1);
              } finally {
                handleFilter();
              }
            }}
            hideNextButton
            hidePrevButton
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
ProductsList.propTypes = {};

export default ProductsList;