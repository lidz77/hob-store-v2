import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ImageList from "@mui/material/ImageList";
import { Box } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import LoadingBackdrop from "./LoadingBackdrop";
import ImagesGrid from "./ImagesGrid";
import { loadImages } from "../features/admin/products/productPropsSlice";

const ImagesUploader = ({
  handleSelectFiles,
  handleUploadImages,
  previewImages,
  imagesInfo,
  handleRemoveImage,
  imagesList,
  propsIsLoading,
  imagesIdArray,
  productId,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadImages(productId));
  }, [productId]);

  return (
    <div className="container">
      {propsIsLoading ? (
        <LoadingBackdrop />
      ) : (
        <div className="form-group">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputLabel
              sx={{
                background: "#4CAF50",
              }}
              htmlFor="product-file"
            >
              {previewImages.length
                ? previewImages.length + " file is selected"
                : "Choose image(s)"}
            </InputLabel>
            <Button
              size="large"
              aria-label="Upload images"
              color="inherit"
              onClick={handleUploadImages}
              sx={{
                float: "right",
              }}
              disabled={imagesInfo.length === 0}
            >
              Upload
              <UploadIcon />
            </Button>
            <Input
              id="product-file"
              type="file"
              inputProps={{
                multiple: true,
                accept: "image/*",
              }}
              sx={{
                visibility: "hidden",
              }}
              onChange={handleSelectFiles}
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Grid
              container
              spacing={2}
              sx={{
                "--Grid-borderWidth": "1px",
                borderTop: "var(--Grid-borderWidth) solid",
                borderLeft: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
                "& > div": {
                  borderRight: "var(--Grid-borderWidth) solid",
                  borderBottom: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                },
              }}
            >
              <ImageList
                sx={{
                  width: 500,
                  height: 450,
                }}
                cols={3}
                rowHeight={164}
              >
                {previewImages && (
                  <ImagesGrid
                    imagesList={previewImages}
                    isLoaded={false}
                    handleRemoveImage={handleRemoveImage}
                  />
                )}
                {imagesList && (
                  <ImagesGrid
                    imagesList={imagesList}
                    isLoaded={true}
                    handleRemoveImage={handleRemoveImage}
                  />
                )}
              </ImageList>
            </Grid>
          </Box>

          {imagesInfo &&
            imagesInfo.map((item, index) => {
              return (
                <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
                  <Box sx={{ width: "100%", mr: 1 }}>
                    <LinearProgressWithLabel
                      variant="determinate"
                      value={item.percentage}
                      name={item.name}
                    />
                  </Box>
                </Box>
              );
            })}
        </div>
      )}
    </div>
  );
};
ImagesUploader.propTypes = {};

export default ImagesUploader;
