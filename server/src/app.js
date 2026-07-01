const express = require('express')
const cors = require('cors')

const productsRouter = require('./routes/products.routes')
const ordersRouter = require('./routes/orders.routes')
const requestLogger = require('./middleware/logger')

const app = express()

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080'],
  credentials: true,
}))

app.use(requestLogger)

app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
  })
})

module.exports = app