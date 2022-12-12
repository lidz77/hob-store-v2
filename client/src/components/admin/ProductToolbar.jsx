import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PostAddIcon from "@mui/icons-material/PostAdd";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  Search,
  SearchIconWrapper,
  StyleInputBase,
} from "../../styles/Toolbar";

const ProductToolbar = ({
  handleDialog,
  setSearchTerm,
  handleDeleteProduct,
  selectedItemsList,
}) => {
  const dispatch = useDispatch();
  const handleSetSearchTerm = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Box>
      <Toolbar position="static">
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Add new category"
            color="inherit"
            onClick={() => handleDialog()}
          >
            <PostAddIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Delete category"
            color="inherit"
            disabled={selectedItemsList.length === 0 ? true : false}
            onClick={() => handleDeleteProduct(selectedItemsList)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyleInputBase
            placeholder="Title..."
            inputProps={{ "aria-label": "search" }}
            onChange={handleSetSearchTerm}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};
ProductToolbar.propTypes = {
  handleDialog: PropTypes.func,
  setSearchTerm: PropTypes.func,
};

export default ProductToolbar;
