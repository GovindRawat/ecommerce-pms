const express = require('express')
const productsRouter = require('./routes/products.routes')
const app = express()
// Built-in middleware to parse JSON request bodies
app.use(express.json())
// Health check — always include one
app.get('/health', (req, res) => {
 res.json({ status: 'ok', timestamp: new Date().toISOString() })
})
// Routes
app.use('/api/products', productsRouter)
// 404 handler — must be last
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found'
  })
})

module.exports = app;