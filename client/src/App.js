import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ROUTES from './app/ROUTES';
import './App.css';
import Administration from './app/Administration'
import CategoriesList from './features/admin/categories/CategoriesList';
import ProductsList from './features/admin/products/ProductsList';
import OrdersList from './features/admin/orders/OrdersList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.adminRoute()} element={<Administration />}
            >
            <Route path={ROUTES.categoriesAdmin()} element={<CategoriesList />} />
            <Route path={ROUTES.productsAdmin()} element={<ProductsList />} />
            <Route path={ROUTES.ordersAdmin()} element={<OrdersList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
