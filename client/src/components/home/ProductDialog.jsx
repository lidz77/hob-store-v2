import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDialog = ({ productDetails, openDialog, handleDialog }) => {
  return (
    <Dialog fullScreen open={openDialog} TransitionComponent={Transition}>
      {productDetails.title && (
        <Box>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ marginLeft: 2, flex: 1 }}>
                {productDetails.title}
              </Typography>
              <IconButton
                onClick={handleDialog}
                edge="end"
                color="inherit"
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Grid container>
            <Grid item xs={5} sx={{ p: 2 }}>
              product images
            </Grid>
            <Grid item xs={7} sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography variant="h6">
                  {productDetails.description}
                </Typography>
                <Typography variant="h6">
                  <strong>dimension:</strong> {productDetails.dimension.name}
                </Typography>
                <Typography variant="h6">
                  {productDetails.material.name}
                </Typography>
                <Typography variant="h6">
                  {productDetails.brand.name}
                </Typography>
                <Typography variant="h6">{productDetails.color}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Dialog>
  );
};
ProductDialog.propTypes = {};

export default ProductDialog;
