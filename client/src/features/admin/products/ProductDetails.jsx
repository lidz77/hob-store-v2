import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import Dialog from "@mui/material/Dialog";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import ProductProperties from "../../../components/ProductProperties";
import ImagesUploader from "../../../components/ImagesUploader";
import LoadingBackdrop from "../../../components/LoadingBackdrop";
import { CirclePicker } from "react-color";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetails = ({
  isLoadingProps,
  openDialog,
  handleDialog,
  handleAddProduct,
  handleUpdateProduct,
  setEditMode,
  editMode,
  selectProductDetails,
  selectDimensions,
  deleteDimension,
  addDimension,
  selectBrands,
  deleteBrand,
  addBrand,
  selectMaterials,
  deleteMaterial,
  addMaterial,
  selectCategories,
  clearImagesInfo,
  selectImagesInfo,
  selectImagesIdsArray,
  uploadImages,
  setImagesInfo,
  removeImageInfo,
  productsIsLoading,
  selectImages,
}) => {
  const dispatch = useDispatch();
  const productDetails = useSelector(selectProductDetails);
  const dimensionsList = useSelector(selectDimensions);
  const brandsList = useSelector(selectBrands);
  const materialsList = useSelector(selectMaterials);
  const imagesList = useSelector(selectImages);
  const propsIsLoading = useSelector(isLoadingProps);
  const categoriesList = useSelector(selectCategories);
  const imagesInfo = useSelector(selectImagesInfo);
  const imageIdsArray = useSelector(selectImagesIdsArray);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [dimensionId, setDimensionId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);
  const [materialId, setMaterialId] = useState(null);
  const [color, setColor] = useState("#f795548");
  const [images, setImages] = useState(undefined);
  const [previewImages, setPreviewImages] = useState([]);

  const clearDetailsAndCloseDialog = () => {
    setTitle("");
    setDescription("");
    setAvailable(false);
    setCategoryId(null);
    setDimensionId(null);
    setBrandId(null);
    setMaterialId(null);
    setPrice(0);
    clearImages();
    setEditMode(false);
    handleDialog(false);
  };

  useEffect(() => {
    if (editMode) {
      setTitle(productDetails.title);
      setDescription(productDetails.description);
      setPrice(productDetails.price);
      setAvailable(productDetails.available);
      setDimensionId(
        productDetails.dimension ? productDetails.dimension.id : null
      );
      setCategoryId(
        productDetails.category ? productDetails.category.id : null
      );
      setBrandId(productDetails.brand ? productDetails.brand.id : null);
      setMaterialId(productDetails.material ? productDetails.brand.id : null);
      setColor(productDetails.color);
      setPrice(productDetails.price);
    }
  }, [productDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const details = {
      title: title,
      description: description,
      available: available,
      dimensionId: dimensionId,
      brandId: brandId,
      materialId: materialId,
      categoryId: categoryId,
      price: price,
      color: color.hex,
      productImagesId: imageIdsArray,
    };

    if (editMode) {
      console.log(details);
      handleUpdateProduct({ id: productDetails.id, data: details });
    } else {
      handleAddProduct(details);
    }

    clearDetailsAndCloseDialog();
  };

  const handlePickDimension = (id) => {
    setDimensionId(id);
  };
  const handlePickBrand = (id) => {
    setBrandId(id);
  };
  const handlePickMaterial = (id) => {
    setMaterialId(id);
  };
  const handlePickCategory = (id) => {
    setCategoryId(id);
  };

  const clearImages = () => {
    setImages(undefined);
    setPreviewImages([]);
    dispatch(clearImagesInfo());
  };

  const handleRemoveImage = (idx) => {
    const dt = new DataTransfer();
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (idx !== i) {
        dt.items.add(image); // here you exclude the file. thus removing it.
      }
    }
    setImages(dt.files);
    setPreviewImages((previewImages) =>
      previewImages.filter((item, index) => {
        return index !== idx;
      })
    );
    dispatch(removeImageInfo(idx));
  };

  const handleUploadImages = () => {
    // console.log(images);
    dispatch(uploadImages(images));
  };

  const handleSelectFiles = (e) => {
    clearImages();
    let files = e.target.files;
    //console.log(Object.keys(files));
    //console.log(Object.values(files));
    setPreviewImages(Object.values(files));
    setImages(files);
    Array.prototype.forEach.call(files, (item) => {
      dispatch(
        setImagesInfo({
          percentage: 0,
          name: item.name,
        })
      );
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {productsIsLoading ? (
        <LoadingBackdrop />
      ) : (
        <Dialog
          open={openDialog}
          fullScreen
          onClose={clearDetailsAndCloseDialog}
          TransitionComponent={Transition}
          sx={{
            margin: (theme) => theme.spacing(2),
          }}
        >
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <DialogTitle
              sx={{
                m: 0,
                p: 2,
                padding: (theme) => theme.spacing(2),
                background: "#1976D2",
              }}
            >
              Add new product
              <IconButton
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
                onClick={clearDetailsAndCloseDialog}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <form id="product-details" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={3} sm container>
                  <Grid item xs>
                    <FormControl>
                      <InputLabel htmlFor="product-name">Name: </InputLabel>
                      <Input
                        id="product-name"
                        aria-describedby="my-helper-text"
                        required
                        value={title || ""}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    <br />
                    <FormControl
                      sx={{
                        paddingTop: "10px",
                      }}
                    >
                      <TextField
                        label="Descriptions"
                        id="product-description"
                        rows={12}
                        placeholder="Descriptions"
                        value={description || ""}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline
                      />
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={available || false}
                          onChange={() => setAvailable(!available)}
                        />
                      }
                      label="Available"
                    />
                    <Box sx={{ flexGrow: 5 }} />
                    <Typography variant="body">
                      Color code must go there{" "}
                    </Typography>
                    <CirclePicker
                      color={color || "0fff"}
                      onChange={(color) => setColor(color)}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={3} sm>
                  <ProductProperties
                    propsList={dimensionsList}
                    deleteProp={deleteDimension}
                    addProp={addDimension}
                    handlePickProp={handlePickDimension}
                    propName="Dimension"
                    propDetails={
                      productDetails.dimension ? productDetails.dimension : {}
                    }
                  />
                  <ProductProperties
                    propsList={brandsList}
                    deleteProp={deleteBrand}
                    addProp={addBrand}
                    handlePickProp={handlePickBrand}
                    propName="Brand"
                    propDetails={
                      productDetails.brand ? productDetails.brand : {}
                    }
                  />
                  <ProductProperties
                    propsList={materialsList}
                    deleteProp={deleteMaterial}
                    addProp={addMaterial}
                    handlePickProp={handlePickMaterial}
                    propName="Material"
                    propDetails={
                      productDetails.material ? productDetails.material : {}
                    }
                  />
                  <ProductProperties
                    propsList={categoriesList}
                    handlePickProp={handlePickCategory}
                    propName="Category"
                    propDetails={
                      productDetails.category ? productDetails.category : {}
                    }
                  />
                  <FormControl>
                    <InputLabel htmlFor="product-price">Price</InputLabel>
                    <Input
                      id="product-price"
                      aria-describedby="my-helper-text"
                      value={price || 0}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <ImagesUploader
                    propsIsLoading={propsIsLoading}
                    handleSelectFiles={handleSelectFiles}
                    handleUploadImages={handleUploadImages}
                    previewImages={previewImages}
                    imagesInfo={imagesInfo}
                    handleRemoveImage={handleRemoveImage}
                    imagesList={imagesList}
                    productId={productDetails.id}
                  />
                </Grid>
              </Grid>
              <Box sx={{ flexGrow: 1 }} />
              <FormGroup>
                <FormControl>
                  <BottomNavigation showLabels>
                    <BottomNavigationAction
                      label="Done"
                      type="submit"
                      icon={<DoneIcon />}
                    />
                    <BottomNavigationAction
                      onClick={clearDetailsAndCloseDialog}
                      label="Cancel"
                      icon={<CloseIcon />}
                    />
                  </BottomNavigation>
                </FormControl>
              </FormGroup>
            </form>
          </Paper>
        </Dialog>
      )}
    </Box>
  );
};
ProductDetails.propTypes = {
  loadDimensions: PropTypes.func,
  dimensionsList: PropTypes.array,
  deleteDimension: PropTypes.func,
  addDimension: PropTypes.func,
  loadBrands: PropTypes.func,
  brandsList: PropTypes.array,
  deleteBrand: PropTypes.func,
  addBrand: PropTypes.func,
  loadMaterials: PropTypes.func,
  materialsList: PropTypes.array,
  deleteMaterial: PropTypes.func,
  addMaterial: PropTypes.func,
  openDialog: PropTypes.bool,
  handleDialog: PropTypes.func,
  handleAddProduct: PropTypes.func,
};

export default ProductDetails;
