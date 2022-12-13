import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
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
  handleLoadFilterOptions,
  dimensionsList,
  brandsList,
}) => {
  const [category, setCategory] = useState(null);
  const [dimension, setDimension] = useState(null);
  const [brand, setBrand] = useState([]);
  const [searchText, setSearchText] = useState();

  const handleBrandChecker = (brandId) => {};

  useEffect(() => {
    handleLoadFilterOptions();
  }, []);

  return (
    <Container
      sx={{
        maxWidth: "sm",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id="home-select-category">Category</InputLabel>
        <Select
          labelId="home-select-category"
          onChange={(e) => setCategory(e.target.value)}
          value={category || ""}
        >
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
          value={dimension || ""}
        >
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
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
                    <Checkbox />
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </FormControl>
      <Button primary sm={6} type="submit">
        Find
      </Button>
      <Button secondary sm={6}>
        Clear
      </Button>
    </Container>
  );
};
FilterBox.propTypes = {};

export default FilterBox;
