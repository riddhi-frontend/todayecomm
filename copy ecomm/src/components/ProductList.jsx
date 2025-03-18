import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const navigate = useNavigate();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() => {
          alert('Product deleted successfully');
          // Remove product from state
        })
        .catch((error) => {
          console.error('Error deleting product', error);
          alert('Failed to delete product.');
        });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="product-list">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td><img src={product.image} alt={product.name} width={50} /></td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.stockqty > 0 ? 'In Stock' : 'Out of Stock'}</td>
              <td>
                <button onClick={() => handleEdit(product.id)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * productsPerPage >= products.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;