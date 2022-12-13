import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./app/ROUTES";
import "./App.css";
import Administration from "./app/Administration";
import Categories from "./features/admin/categories/Categories";
import Products from "./features/admin/products/Products";
import Orders from "./features/admin/orders/Orders";
import Home from "./app/Home";
import AboutUs from "./features/home/AboutUs";
import CookBooks from "./features/home/CookBooks";
import ProductsList from "./features/home/ProductsList";
import Main from "./features/home/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.adminRoute()} element={<Administration />}>
            <Route path={ROUTES.categoriesAdmin()} element={<Categories />} />
            <Route path={ROUTES.productsAdmin()} element={<Products />} />
            <Route path={ROUTES.ordersAdmin()} element={<Orders />} />
          </Route>
        </Routes>
        <Routes>
          <Route path={ROUTES.homeRoute()} element={<Home />}>
            <Route path={ROUTES.homeRoute()} element={<Main />} />
            <Route path={ROUTES.productsHome()} element={<ProductsList />} />
            <Route path={ROUTES.categoriesHome()} element={<ProductsList />} />
            <Route path={ROUTES.cookBooksHome()} element={<CookBooks />} />
            <Route path={ROUTES.aboutUsHome()} element={<AboutUs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
