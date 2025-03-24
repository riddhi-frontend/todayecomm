import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import AddProduct from './components/AddProduct';
import LoginForm from './components/LoginForm';
import EditProduct from './components/EditProduct';
import ProductList from './components/ProductList';

const App = () => {
  return (
    <Router>
      <div className="content">
        <div className="csub"><Sidebar /></div>
      <div className="sub ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} /> Pass the ID in the route
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
      </div>
    </Router>
  );
};

export default App;