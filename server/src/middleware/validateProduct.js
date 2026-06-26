function validateProduct(req, res, next) {
  const { name, description, price, image, inStock } = req.body

  const errors = []

  if (!name || typeof name !== 'string') {
    errors.push('name is required and must be a string')
  }

  if (!description || typeof description !== 'string') {
    errors.push('description is required and must be a string')
  }

  if (typeof price !== 'number' || price < 0) {
    errors.push('price must be a non-negative number')
  }

  if (!image || typeof image !== 'string') {
    errors.push('image is required and must be a string')
  }

  if (typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean')
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors })
  }

  next()
}

module.exports = validateProduct