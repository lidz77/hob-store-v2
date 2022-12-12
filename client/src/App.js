import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ROUTES from "./app/ROUTES";
import "./App.css";
import Administration from "./app/Administration";
import Categories from "./features/admin/categories/Categories";
import Products from "./features/admin/products/Products";
import Orders from "./features/admin/orders/Orders";
import Home from "./app/Home";

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
          <Route path={ROUTES.homeRoute()} element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
