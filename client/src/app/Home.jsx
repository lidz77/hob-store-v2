import React from "react";
import PropTypes from "prop-types";
import MainMenu from "../components/home/MainMenu";
import { Container, createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

const defaultTheme = createTheme({
  palette: {},
});

const Home = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ maxWidth: "xl", marginBottom: "50px" }}>
        <MainMenu />
      </Container>
      <Container sx={{ maxWidth: "md" }}>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};
Home.propTypes = {};

export default Home;
