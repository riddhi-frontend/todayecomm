import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stockqty: '',
    image: ''
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch product data by id when the component mounts
  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        setError('Error fetching product data');
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const validateUrl = (url) => {
    const regex = /(http(s)?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))/i;
    return regex.test(url);
  };

  const validateFields = () => {
    if (!product.name || !product.price || !product.category || !product.stockqty || !product.image) {
      setError('All fields are required');
      return false;
    }

    if (product.price <= 0 || product.stockqty < 0) {
      setError('Price and stock quantity must be greater than zero');
      return false;
    }

    if (!validateUrl(product.image)) {
      setError('Please enter a valid image URL');
      return false;
    }

    setError(''); // Clear any previous errors
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateFields()) return;

    axios
      .put(`http://localhost:5000/products/${id}`, product)
      .then((response) => {
        alert('Product updated successfully');
        navigate('/'); // Redirect to the Dashboard after update
      })
      .catch((error) => {
        setError('Failed to update the product');
        console.error(error);
      });
  };

  const handleCancel = () => {
    navigate('/'); // Redirect to the Dashboard if cancel is clicked
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stockqty">Stock Quantity</label>
          <input
            type="number"
            id="stockqty"
            name="stockqty"
            value={product.stockqty}
            onChange={handleChange}
            required
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;