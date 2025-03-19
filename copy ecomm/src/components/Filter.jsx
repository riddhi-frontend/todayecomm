import React from 'react'

const Filter = ({
  category,
  setCategory,
  stockAvailability,
  setStockAvailability,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
}) => {
  const handleCategoryFilter = (e) => setCategory(e.target.value)
  const handleStockFilter = (e) => setStockAvailability(e.target.value)
  const handleSearchChange = (e) => setSearchTerm(e.target.value)
  const handleSort = (e) => setSortOrder(e.target.value)

  return (
    <div className="filters">

      <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleSearchChange}/>

      <select onChange={handleCategoryFilter} value={category} className='catergory'>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="home">Home</option>
        <option value="other">Other</option>
      </select>

      <select onChange={handleStockFilter} value={stockAvailability}>
        <option value="">All Stock</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>


      <select onChange={handleSort} value={sortOrder}>
        <option value="">Sort</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>
    </div>
  )
}

export default Filter
