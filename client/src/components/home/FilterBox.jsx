import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  OutlinedInput,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  Checkbox,
  ListItemButton,
  ListItemText,
  Button,
} from "@mui/material";
import Search from "@mui/icons-material/Search";

const FilterBox = ({
  categoriesList,
  dimensionsList,
  brandsList,
  handleFilter,
  brand,
  setBrand,
  category,
  setCategory,
  dimension,
  setDimension,
  setSearchTerm,
  searchTerm,
  clearFilter,
}) => {
  const handleBrandChecker = (brandId) => {
    if (brand.includes(brandId)) {
      setBrand(brand.filter((item) => item !== brandId));
    } else {
      setBrand([...brand, brandId]);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  useEffect(() => {
    setBrand(brandsList.map((item) => item.id));
    // handleLoadFilterOptions();
  }, [brandsList]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="home-select-category">Category</InputLabel>
        <Select
          labelId="home-select-category"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <MenuItem value={0}>ALL</MenuItem>
          {categoriesList &&
            categoriesList.map((item, index) => {
              return (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="home-select-dimension">Dimension</InputLabel>
        <Select
          labelId="home-select-dimension"
          onChange={(e) => setDimension(e.target.value)}
          value={dimension}
        >
          <MenuItem value={0}>ALL</MenuItem>
          {dimensionsList &&
            dimensionsList.map((item, index) => {
              return (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel htmlFor="home-search">Search</InputLabel>
        <OutlinedInput
          id="home-search"
          variant="filled"
          endAdornment={
            <InputAdornment position="start">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          }
          value={searchTerm || ""}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth>
        <List>
          {brandsList &&
            brandsList.map((item, index) => {
              return (
                <ListItem key={item.id}>
                  <ListItemButton>
                    <ListItemText primary={item.name} />
                    <Checkbox
                      onChange={() => handleBrandChecker(item.id)}
                      defaultChecked={true}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </FormControl>
      <Button sm={6} type="submit">
        Find
      </Button>
      <Button sm={6} onClick={clearFilter}>
        Clear
      </Button>
    </form>
  );
};
FilterBox.propTypes = {};

export default FilterBox;
