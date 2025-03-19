import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [image, setImage] = useState('')
  const [titleError, setTitleError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [categoryError, setCategoryError] = useState('')
  const [stockError, setStockError] = useState('')
  const [imageError, setImageError] = useState('')
  const [error, setError] = useState('') // For general error message

  const navigate = useNavigate()

  // Validate image URL
  const isValidImageUrl = (url) => {
    const externalUrlPattern = /^(https?:\/\/)/
    const internalUrlPattern = /^(\/|images\/)/
    return externalUrlPattern.test(url) || internalUrlPattern.test(url)
  }

  // Handle dynamic validation for Title
  const handleTitleChange = (e) => {
    const value = e.target.value
    setTitle(value)

    if (!value) {
      setTitleError('This field is required.')
    } else {
      setTitleError('') // Clear error when valid input is entered
    }
  }

  // Handle dynamic validation for Price (no negative values)
  const handlePriceChange = (e) => {
    const value = e.target.value

    // Prevent negative values
    if (value < 0) {
      setPriceError('Price cannot be negative.')
    } else if (value === 0) {
      setPriceError('Price must be greater than 0.')
    } else {
      setPriceError('')
    }

    setPrice(value)
  }

  // Handle dynamic validation for Category
  const handleCategoryChange = (e) => {
    const value = e.target.value
    setCategory(value)

    if (!value) {
      setCategoryError('This field is required.')
    } else {
      setCategoryError('') // Clear error when valid input is entered
    }
  }

  // Handle dynamic validation for Stock (no negative values)
  const handleStockChange = (e) => {
    const value = e.target.value

    // Prevent negative values
    if (value < 0) {
      setStockError('Stock cannot be negative.')
    } else if (!value) {
      setStockError('This field is required.')
    } else {
      setStockError('')
    }

    setStock(value)
  }

  // Handle dynamic validation for Image URL
  const handleImageChange = (e) => {
    const value = e.target.value
    setImage(value)

    if (!value) {
      setImageError('This field is required.')
    } else if (!isValidImageUrl(value)) {
      setImageError('Image URL must be a valid external or internal link.')
    } else {
      setImageError('') // Clear error when valid input is entered
    }
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Reset general error and field-specific errors
    setError('')
    setTitleError('')
    setPriceError('')
    setCategoryError('')
    setStockError('')
    setImageError('')

    let valid = true

    // Field validation
    if (!title) {
      setTitleError('This field is required')
      valid = false
    }
    if (!price || price <= 0) {
      setPriceError('Price cannot br negative or empty')
      valid = false
    }
    if (!category) {
      setCategoryError('This field is required')
      valid = false
    }
    if (stock < 0 || !stock) {
      setStockError('Stock cannot be negative or empty.')
      valid = false
    }
    if (!image) {
      setImageError('This field is required')
      valid = false
    } else if (!isValidImageUrl(image)) {
      setImageError('Image URL must be a valid external or internal link.')
      valid = false
    }

    // If invalid, don't proceed
    if (!valid) {
      return
    }

    // Create product object
    const newProduct = { title, price, category, stock, image }

    // Submit to backend via axios
    axios
      .post('http://localhost:5000/products', newProduct)
      .then((response) => {
        alert('Product created successfully')
        navigate('/') // Use navigate for redirection
      })
      .catch((error) => {
        console.error('Error creating product', error)
        setError('There was an error creating the product.')
      })
  }

  // Reset the form
  const handleReset = () => {
    setTitle('')
    setPrice('')
    setCategory('')
    setStock('')
    setImage('')
    setTitleError('')
    setPriceError('')
    setCategoryError('')
    setStockError('')
    setImageError('')
    setError('')
  }

  // Cancel and navigate to dashboard
  const handleCancel = () => {
    alert('Are you sure you want to cancel ?')
    navigate('/')
  }

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={title} onChange={handleTitleChange}/>
        {titleError && <p className="error-message">{titleError}</p>}

        <input  type="number" placeholder="Price" value={price} onChange={handlePriceChange}/>
        {priceError && <p className="error-message">{priceError}</p>}

        <input type="number" placeholder="Stock" value={stock} onChange={handleStockChange}/>
        {stockError && <p className="error-message">{stockError}</p>}

        <input type="text" placeholder="Category" value={category} onChange={handleCategoryChange}/>
        {categoryError && <p className="error-message">{categoryError}</p>}

        <input type="text" placeholder="Image URL" value={image} onChange={handleImageChange}/>
        {imageError && <p className="error-message">{imageError}</p>}

        <div className="button-group">
          <button type="submit">Add Product</button>
          <button className='reset' type="button" onClick={handleReset}>Reset</button>
          <button className='cancel' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default AddProduct
