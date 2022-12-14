import React from "react";
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

//main function
const CategoryToolbar = ({
  handleDialog,
  searchText,
  handleSearchTerm,
  handleDelete,
  selectedItems,
  setEditMode,
}) => {
  return (
    <Box>
      <Toolbar position="static">
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Add new category"
            color="inherit"
            onClick={() => {
              handleDialog();
              setEditMode(false);
            }}
          >
            <PostAddIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton
            size="large"
            aria-label="Delete category"
            color="inherit"
            onClick={() => handleDelete(selectedItems)}
            disabled={selectedItems.length === 0 ? true : false}
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
            value={searchText}
            onChange={handleSearchTerm}
          />
        </Search>
      </Toolbar>
    </Box>
  );
};

export default CategoryToolbar;
