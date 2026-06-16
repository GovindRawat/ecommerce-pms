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

module.exports = {
  getAllProducts,
  getProductById
}