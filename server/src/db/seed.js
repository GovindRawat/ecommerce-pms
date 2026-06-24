require('dotenv').config()

const { Pool } = require('pg')

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

const seedProducts = [
 {
 name: 'Wireless Headphones',
 description: 'Premium noise-cancelling over-ear headphones with 30-hour battery life.',
 price: 149.99,
 image: 'https://placehold.co/400x400?text=Headphones',
 inStock: true,
 },
 {
 name: 'Cotton T-Shirt',
 description: 'Soft, breathable 100% organic cotton tee in classic fit.',
 price: 24.99,
  image: 'https://placehold.co/400x400?text=T-Shirt',
 inStock: true,
 },
  {
 name: 'Smart Watch',
 description: 'Track fitness, calls and notifications with a modern smartwatch experience.',
 price: 2499,
 image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000?text=Smart%20Watch&fit=crop&w=400&h=400',
 inStock: false,
 },
 {
 name: 'Nike Air Max',
 description: 'Comfortable and stylish sneakers designed for everyday wear and sports activities.',
 price: 4999,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?text=Nike%20Air%20Max&fit=crop&w=400&h=400',
 inStock: true,
 },
 {
 name: 'iPhone 15 Pro',
 description: ' Powerful smartphone with advanced camera system and premium performance.',
 price: 11999,
  image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000?text=iPhone%2015%20Pro&fit=crop&w=400&h=400',
 inStock: true,
 },
 {
 name: 'Headphones',
 description: 'Enjoy immersive sound with active noise cancellation and long battery life.',
 price: 3299,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000?text=Headphones&fit=crop&w=400&h=400',
 inStock: true,
 },
]

async function seed() {
  const client = await pool.connect()

  try {
    console.log(' Seeding database...')

    for (const product of seedProducts) {
      await client.query(
        `
        INSERT INTO products
        (name, description, price, image, in_stock)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [
          product.name,
          product.description,
          product.price,
          product.image,
          product.inStock,
        ]
      )
    }

    console.log(`✅ Inserted ${seedProducts.length} products`)
  } catch (err) {
    console.error('❌ Seed failed:', err.message)
  } finally {
    client.release()
    await pool.end()
  }
}

seed()