import React from "react";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingBackdrop = (props) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      transitionDuration={{
        appear: 5000,
        enter: 5000,
        exit: 5000,
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
LoadingBackdrop.propTypes = {};

export default LoadingBackdrop;
