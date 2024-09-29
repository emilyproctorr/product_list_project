import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function AppRoutes() {
    return (
        <Router basename="/product_list_project">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
    );
  }
  
  export default AppRoutes;