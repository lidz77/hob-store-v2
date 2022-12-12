import React from "react";
import PropTypes from "prop-types";
import MainMenu from "../components/home/MainMenu";
import { Container, createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {},
});

const Home = (props) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container sx={{ maxWidth: "xl" }}>
        <MainMenu />
      </Container>
    </ThemeProvider>
  );
};
Home.propTypes = {};

export default Home;
