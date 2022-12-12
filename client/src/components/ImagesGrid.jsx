import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "200",
  maxHeight: "200",
  width: 164,
  height: 164,
  fit: "crop",
  auto: "format",
});

const ImagesGrid = ({ imagesList, isLoaded, handleRemoveImage }) => {
  return (
    <Grid minHeight={160}>
      {imagesList.map((item, index) => {
        return (
          <ImageListItem>
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            ></ImageListItemBar>
            {isLoaded ? (
              <Img
                className="preview"
                src={`data:image;base64, ${item.url}`}
                alt={`image-` + index}
                loading="lazy"
              />
            ) : (
              <Img
                className="preview"
                src={URL.createObjectURL(item)}
                alt={`image-` + index}
                loading="lazy"
              />
            )}
          </ImageListItem>
        );
      })}
    </Grid>
  );
};
ImagesGrid.propTypes = {
  imagesList: PropTypes.array,
  isLoaded: PropTypes.bool,
  handleRemoveImage: PropTypes.func,
};

export default ImagesGrid;
