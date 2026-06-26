const pool = require('../db/pool')
const { rowToProduct } = require('../db/mappers')

async function getAllProducts(req, res) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    )

    res.json(rows.map(rowToProduct))
  } catch (err) {
    console.error('getAllProducts error:', err)

    res.status(500).json({
      error: 'Failed to fetch products',
    })
  }
}
async function getProductById(req, res) {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Product ID must be a number',
    })
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        error: `Product with id ${id} not found`,
      })
    }

    res.json(rowToProduct(rows[0]))
  } catch (err) {
    console.error('getProductById error:', err)

    res.status(500).json({
      error: 'Failed to fetch product',
    })
  }
}
async function createProduct(req, res) {
  const { name, description, price, image, inStock } = req.body
  try {
    const { rows } = await pool.query(
      `INSERT INTO products
       (name, description, price, image, in_stock)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, price, image, inStock]
    )

    res.status(201).json(rowToProduct(rows[0]))
  } catch (err) {
    console.error('createProduct error:', err)

    res.status(500).json({
      error: 'Failed to create product',
    })
  }
}
async function updateProduct(req, res) {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Product ID must be a number',
    })
  }

  const { name, description, price, image, inStock } = req.body
  try {
    const { rows } = await pool.query(
      `UPDATE products
       SET
         name = $1,
         description = $2,
         price = $3,
         image = $4,
         in_stock = $5,
         updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, description, price, image, inStock, id]
    )

    if (rows.length === 0) {
      return res.status(404).json({
        error: `Product with id ${id} not found`,
      })
    }

    res.json(rowToProduct(rows[0]))
  } catch (err) {
    console.error('updateProduct error:', err)

    res.status(500).json({
      error: 'Failed to update product',
    })
  }
}
async function deleteProduct(req, res) {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Product ID must be a number',
    })
  }

  try {
    const { rowCount } = await pool.query(
      'DELETE FROM products WHERE id = $1',
      [id]
    )

    if (rowCount === 0) {
      return res.status(404).json({
        error: `Product with id ${id} not found`,
      })
    }

    res.status(204).send()
  } catch (err) {
    console.error('deleteProduct error:', err)

    res.status(500).json({
      error: 'Failed to delete product',
    })
  }
}
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}