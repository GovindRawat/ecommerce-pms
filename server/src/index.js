require('dotenv').config()

const app = require('./app')

// Load database connection
require('./db/pool')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})