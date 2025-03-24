import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppProvider, Button, ButtonGroup, Form, FormLayout, Text, TextField } from '@shopify/polaris'
import MyPolarisForm from './MyPolarisFrom'

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
  const handleTitleChange = (value) => {
    setTitle(value)

    if (!value) {
      setTitleError('This field is required.')
    } else {
      setTitleError('') // Clear error when valid TextField is entered
    }
  }

  // Handle dynamic validation for Price (no negative values)
  const handlePriceChange = (value) => {

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
  const handleCategoryChange = (value) => {
    setCategory(value)

    if (!value) {
      setCategoryError('This field is required.')
    } else {
      setCategoryError('') // Clear error when valid TextField is entered
    }
  }

  // Handle dynamic validation for Stock (no negative values)
  const handleStockChange = (value) => {

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
  const handleImageChange = (value) => {
    setImage(value)

    if (!value) {
      setImageError('This field is required.')
    } else if (!isValidImageUrl(value)) {
      setImageError('Image URL must be a valid external or internal link.')
    } else {
      setImageError('') // Clear error when valid TextField is entered
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
    <AppProvider>
      <div className="add-product-container">
        <Text as='h2' variant='heading2xl' tone="inherit-reverse">Add New Product</Text>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
        <TextField label="Product Name" value={title} onChange={handleTitleChange}/>
        {titleError && <p className="error-message">{titleError}</p>}

        <TextField label="Price" value={price} onChange={handlePriceChange}/>
        {priceError && <p className="error-message">{priceError}</p>}

        <TextField label="Stock" value={stock} onChange={handleStockChange}/>
        {stockError && <p className="error-message">{stockError}</p>}

        <TextField label="Category" value={category} onChange={handleCategoryChange}/>
        {categoryError && <p className="error-message">{categoryError}</p>}

        <TextField label="Image URL" value={image} onChange={handleImageChange}/>
        {imageError && <p className="error-message">{imageError}</p>}

        <div className="button-group">
        <ButtonGroup>
          <Button>Add Product</Button>
          <div className="reset"><Button size="large" onClick={handleReset}>Reset</Button></div>
          <div className="cancel"><Button onClick={handleCancel}>Cancel</Button></div>
        </ButtonGroup>
        </div>
        </FormLayout>
      </Form>

      {error && <p className="error-message">{error}</p>}
    </div>
<MyPolarisForm/>

    </AppProvider>

  )
}

export default AddProduct
