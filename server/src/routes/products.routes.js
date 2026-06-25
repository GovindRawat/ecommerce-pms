const express = require('express')
const productsController = require('../controllers/products.controller')
const validateProduct = require('../middleware/validateProduct')

const router = express.Router()

router.get('/', productsController.getAllProducts)

router.get('/:id', productsController.getProductById)

router.post(
  '/',
  validateProduct,
  productsController.createProduct
)

router.put(
  '/:id',
  validateProduct,
  productsController.updateProduct
)

router.delete('/:id', productsController.deleteProduct)

module.exports = router