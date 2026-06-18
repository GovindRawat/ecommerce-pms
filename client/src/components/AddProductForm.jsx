import { useState } from 'react'
import Button from './Button'
import { apiFetch } from '../lib/api'
import { useProductsContext } from '../context/ProductsContext'

const EMPTY_FORM = {
  name: '',
  description: '',
  price: '',
  image: '',
  inStock: true,
}

function AddProductForm() {
  const { refetch } = useProductsContext()

  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(event) {
  event.preventDefault()

  try {
    setSubmitting(true)
    setError(null)
    setSuccess(false)

    await apiFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
      }),
    })

    await refetch()

    setForm(EMPTY_FORM)
    setSuccess(true)

setTimeout(() => {
  setSuccess(false)
}, 3000)
  } catch (err) {
    setError(err.message)
    setSuccess(false)
  } finally {
    setSubmitting(false)
  }
}

  return (
    <section className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>
      {success && (
  <div className="mb-4 p-3 rounded bg-green-100 border border-green-300 text-green-700">
    Product created successfully!
  </div>
)}

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows="3"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            value={form.image}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="inStock"
            name="inStock"
            type="checkbox"
            checked={form.inStock}
            onChange={handleChange}
          />
          <label htmlFor="inStock">
            In Stock
          </label>
        </div>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
    </section>
  )
}

export default AddProductForm