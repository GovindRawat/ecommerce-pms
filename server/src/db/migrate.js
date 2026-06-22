require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

async function migrate() {
  const client = await pool.connect()

  try {
    console.log('🚀 Running migrations...')

    // Create migrations tracking table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)

    // Get already-applied migrations
    const result = await client.query(
      'SELECT filename FROM migrations'
    )

    const appliedMigrations = result.rows.map(row => row.filename)

    // Read migration files
    const migrationsDir = path.join(__dirname, 'migrations')

    const files = fs
      .readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort()

    for (const file of files) {
      if (appliedMigrations.includes(file)) {
        console.log(`⏭ Skipping ${file} (already applied)`)
        continue
      }

      console.log(`📄 Applying ${file}...`)

      const sql = fs.readFileSync(
        path.join(migrationsDir, file),
        'utf8'
      )

      await client.query('BEGIN')

      try {
        await client.query(sql)

        await client.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [file]
        )

        await client.query('COMMIT')

        console.log(`✅ Applied ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw err
      }
    }

    console.log('🎉 Migrations complete')
  } catch (err) {
    console.error('❌ Migration failed:', err.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

migrate()