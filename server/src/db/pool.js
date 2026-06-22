const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// Test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Failed to connect to database:', err.message)
    process.exit(1) // crash early rather than serving broken requests
  }

  console.log('✅ Connected to PostgreSQL database')

  release() // return client to pool
})

module.exports = pool