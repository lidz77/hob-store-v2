import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { AppBar, Box, Grid, ListItemButton, ListItemText } from "@mui/material";
import ROUTES from "../../app/ROUTES";

const MainMenu = () => {
  return (
    <Box>
      <AppBar>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <ListItemButton to={ROUTES.homeRoute()} component={NavLink}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </Grid>
          <Grid item>
            <ListItemButton to={ROUTES.categoriesHome()} component={NavLink}>
              <ListItemText primary={"Categories"} />
            </ListItemButton>
          </Grid>
          <Grid item>
            <ListItemButton to={ROUTES.productsHome()} component={NavLink}>
              <ListItemText primary={"Products"} />
            </ListItemButton>
          </Grid>
          <Grid item>
            <ListItemButton to={ROUTES.aboutUsHome()} component={NavLink}>
              <ListItemText primary={"About us"} />
            </ListItemButton>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};
MainMenu.propTypes = {};

export default MainMenu;
