const express = require('express')
const ordersController = require('../controllers/orders.controller')

const router = express.Router()

router.post('/', ordersController.createOrder)

router.get('/:id', ordersController.getOrderById)

module.exports = router