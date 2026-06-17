const express = require('express')
const app = express();
app.use(express.json());
const requestLogger = require('./middleware/logger')
const productsRouter = require('./routes/products.routes')
const cors = require('cors')
app.use(cors({
 origin: 'http://localhost:5173', // only Vite's dev port
 credentials: true,
}))
app.use(requestLogger) // ← BEFORE all routes
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