import React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ width: "100%", mr: 1 }}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        {props.name}
      </Typography>
      <LinearProgress
        variant="determinate"
        {...props}
        sx={{
          height: "20px",
          marginTop: "-20px",
        }}
        color="success"
      />
    </Box>
  );
};
LinearProgressWithLabel.propTypes = {};

export default LinearProgressWithLabel;
