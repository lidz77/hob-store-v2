import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ROUTES from "./ROUTES";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Categories from "../features/admin/categories/Categories";
import Products from "../features/admin/products/Products";
import Orders from "../features/admin/orders/Orders";
import { DrawerHeader, Drawer, AppBar } from "../components/admin/Drawer";

const Administration = () => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const renderElement = (text) => {
    switch (text) {
      case "Categories":
        return {
          route: ROUTES.categoriesAdmin(),
          icon: <CategoryIcon />,
          component: <Categories />,
        };
      case "Products":
        return {
          route: ROUTES.productsAdmin(),
          icon: <InventoryIcon />,
          component: <Products />,
        };
      default:
        return {
          route: ROUTES.ordersAdmin(),
          icon: <ShoppingCartIcon />,
          component: <Orders />,
        };
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={drawerOpen}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                marginRight: 5,
                ...(drawerOpen && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              CRM
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={drawerOpen}>
          <DrawerHeader>
            <IconButton onClick={handleDrawer}>
              MENU{" "}
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {["Categories", "Products", "Orders"].map((item, index) => {
              return (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{ display: "block" }}
                  component={NavLink}
                  to={renderElement(item).route}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: drawerOpen ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: drawerOpen ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      {renderElement(item).icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      sx={{ opacity: drawerOpen ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Administration;
