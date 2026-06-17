const { products } = require('../data/products')
function getAllProducts(req, res) {
 res.json(products)
}
function getProductById(req, res) {
 const id = parseInt(req.params.id, 10)
 
 if (isNaN(id)) {
 return res.status(400).json({ error: 'Product ID must be a number' })
 }
 
 const product = products.find(p => p.id === id)
 
 if (!product) {
 return res.status(404).json({ error: `Product with id ${id} not found` })
 }
   // Success
  res.json(product)
}
function createProduct(req, res) {
 const { name, description, price, image, inStock } = req.body
 
 // Validation
 const errors = []
  if (!name || typeof name !== 'string') errors.push('name is required and must be a string')
 if (!description || typeof description !== 'string') errors.push('description is required and must be a string')
 if (typeof price !== 'number' || price < 0) errors.push('price must be a non-negative number')
 if (!image || typeof image !== 'string') errors.push('image is required and must be a string')
 if (typeof inStock !== 'boolean') errors.push('inStock must be a boolean')
 
 if (errors.length > 0) {
 return res.status(400).json({ errors })
 }

// Generate new ID
  const newProduct = {
    id: products.length > 0
      ? Math.max(...products.map(product => product.id)) + 1
      : 1,
    name,
    description,
    price,
    image,
    inStock
  }

  products.push(newProduct)

  res.status(201).json(newProduct)
}
function updateProduct(req, res) {
  const id = parseInt(req.params.id, 10)

  // Validate ID
  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Product ID must be a number'
    })
  }

  // Find product index
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    return res.status(404).json({
      error: `Product with id ${id} not found`
    })
  }

  const {
    name,
    description,
    price,
    image,
    inStock
  } = req.body

  // Same validation as POST
  const errors = []

  if (!name || typeof name !== 'string') {
    errors.push('name is required and must be a string')
  }

  if (!description || typeof description !== 'string') {
    errors.push('description is required and must be a string')
  }

  if (typeof price !== 'number' || price < 0) {
    errors.push('price must be a non-negative number')
  }

  if (!image || typeof image !== 'string') {
    errors.push('image is required and must be a string')
  }

  if (typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  // Update product
  const updatedProduct = {
    id,
    name,
    description,
    price,
    image,
    inStock
  }

  products[index] = updatedProduct

  res.json(updatedProduct)
}
function deleteProduct(req, res) {
 const id = parseInt(req.params.id, 10)
 
 if (isNaN(id)) {
 return res.status(400).json({ error: 'Product ID must be a number' })
 }
 
 const index = products.findIndex(p => p.id === id)
 
 if (index === -1) {
 return res.status(404).json({ error: `Product with id ${id} not found` })
 }
 
 products.splice(index, 1)
 
 res.status(204).send()
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}