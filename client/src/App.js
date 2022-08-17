import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ROUTES from './app/ROUTES';
import './App.css';
import Administration from './app/Administration'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={ROUTES.adminRoute()} element={<Administration />}
            ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
