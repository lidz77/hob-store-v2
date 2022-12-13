import React from "react";
import PropTypes from "prop-types";
import HomeCarousel from "../../components/home/HomeCarousel";
import { Container } from "@mui/material";

const Main = (props) => {
  return (
    <Container sx={{ maxWidth: "xl" }}>
      <HomeCarousel />
    </Container>
  );
};
Main.propTypes = {};

export default Main;
