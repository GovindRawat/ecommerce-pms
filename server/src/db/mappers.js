function rowToProduct(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    image: row.image,
    inStock: row.in_stock,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function rowToOrder(row) {
  return {
    id: row.id,
    totalAmount: parseFloat(row.total_amount),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    items: row.items || [],
  }
}

function rowToOrderItem(row) {
  return {
    id: row.id,
    orderId: row.order_id,
    productId: row.product_id,
    quantity: row.quantity,
    unitPrice: parseFloat(row.unit_price),
  }
}

module.exports = {
  rowToProduct,
  rowToOrder,
  rowToOrderItem,
}