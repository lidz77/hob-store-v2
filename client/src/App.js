import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ROUTES from './app/ROUTES';
import './App.css';
import Administator from './app/Administrator'

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.adminRoute()} element={<Administator />}
            ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
