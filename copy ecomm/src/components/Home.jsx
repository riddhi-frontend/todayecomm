import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
import ProductList from "./ProductList";

const Home = () => {


  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/products")
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products", error));
    }
  }, [navigate]);

  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/products")
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products", error));
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <div className="dashboard-content">
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default Home;