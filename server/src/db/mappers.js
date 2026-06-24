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
module.exports = { rowToProduct }
