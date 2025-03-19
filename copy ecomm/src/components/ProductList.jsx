import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import Filter from './Filter'

const ProductList = ({ products }) => {
  const [category, setCategory] = useState('')
  const [stockAvailability, setStockAvailability] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10
  const navigate = useNavigate()

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage

  // Filter products before applying pagination
  const filteredProducts = products
    .filter((product) =>
      (category ? product.category === category : true) &&
      (stockAvailability
        ? stockAvailability === 'in-stock'
          ? product.stock > 0
          : product.stock === 0
        : true) &&
      (searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price
      if (sortOrder === 'high-low') return b.price - a.price
      return 0
    })

  // Paginate the filtered products
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex)

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() => {
          alert('Product deleted successfully')
          // Remove product from state or refetch products
        })
        .catch((error) => {
          console.error('Error deleting product', error)
          alert('Failed to delete product.')
        })
    }
  }

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`)
  }

  return (
    <>
      <Filter
        category={category}
        setCategory={setCategory}
        stockAvailability={stockAvailability}
        setStockAvailability={setStockAvailability}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
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
            {currentProducts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No products found
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} width={50} alt={product.title} />
                  </td>
                  <td className="name">{product.title}</td>
                  <td className="price">{product.price}</td>
                  <td className="category">{product.category}</td>
                  <td className="stockqty">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(product.id)}>
                      <FaEdit />
                    </button>
                    <button className="delete" onClick={() => handleDelete(product.id)}>
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * productsPerPage >= filteredProducts.length}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductList
