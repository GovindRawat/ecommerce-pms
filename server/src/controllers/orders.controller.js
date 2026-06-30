const pool = require('../db/pool')
const { rowToOrder, rowToOrderItem } = require('../db/mappers')

async function createOrder(req, res) {
  const { items } = req.body || {}

  // Validate request body
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: 'items must be a non-empty array',
    })
  }

  for (const item of items) {
    if (!Number.isInteger(item.productId) || item.productId < 1) {
      return res.status(400).json({
        error: 'each item must have a valid productId',
      })
    }

    if (!Number.isInteger(item.quantity) || item.quantity < 1) {
      return res.status(400).json({
        error: 'each item must have a quantity greater than 0',
      })
    }
  }

  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Fetch all products in one query
    const productIds = items.map(item => item.productId)

    const { rows: products } = await client.query(
      `
      SELECT *
      FROM products
      WHERE id = ANY($1)
      `,
      [productIds]
    )

    // Ensure all products exist
    if (products.length !== productIds.length) {
      await client.query('ROLLBACK')

      return res.status(400).json({
        error: 'one or more products do not exist',
      })
    }

    // Calculate order total from DB prices
    let totalAmount = 0

    for (const item of items) {
      const product = products.find(
        p => p.id === item.productId
      )

      totalAmount +=
        parseFloat(product.price) * item.quantity
    }

    // Create order
    const { rows: orderRows } = await client.query(
      `
      INSERT INTO orders (total_amount)
      VALUES ($1)
      RETURNING *
      `,
      [totalAmount]
    )

    const order = orderRows[0]

    // Create order items
    const createdItems = []

    for (const item of items) {
      const { rows } = await client.query(
        `
        INSERT INTO order_items
        (order_id, product_id, quantity, unit_price)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        
        [
          order.id,
          item.productId,
          item.quantity,
          item.unitPrice,
        ]
      )

      createdItems.push(rowToOrderItem(rows[0]))
    }

    await client.query('COMMIT')

    res.status(201).json({
      ...rowToOrder(order),
      items: createdItems,
    })
  } catch (err) {
    await client.query('ROLLBACK')

    console.error('createOrder error:', err)

    res.status(500).json({
      error: 'Failed to create order',
    })
  } finally {
    client.release()
  }
}
async function getOrderById(req, res) {
  const id = parseInt(req.params.id, 10)

  if (isNaN(id)) {
    return res.status(400).json({
      error: 'Order ID must be a number',
    })
  }

  try {
    const { rows: orderRows } = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE id = $1
      `,
      [id]
    )

    if (orderRows.length === 0) {
      return res.status(404).json({
        error: `Order with id ${id} not found`,
      })
    }

    const order = orderRows[0]

    const { rows: itemRows } = await pool.query(
      `
      SELECT
        oi.id,
        oi.order_id,
        oi.product_id,
        oi.quantity,
        p.name AS product_name,
        p.price AS unit_price
      FROM order_items oi
      JOIN products p
        ON oi.product_id = p.id
      WHERE oi.order_id = $1
      `,
      [id]
    )

    const items = itemRows.map(row => ({
      id: row.id,
      orderId: row.order_id,
      productId: row.product_id,
      productName: row.product_name,
      quantity: row.quantity,
      unitPrice: parseFloat(row.unit_price),
    }))

    res.json({
      ...rowToOrder(order),
      items,
    })
  } catch (err) {
    console.error('getOrderById error:', err)

    res.status(500).json({
      error: 'Failed to fetch order',
    })
  }
}

module.exports = {
  createOrder,
  getOrderById,
}