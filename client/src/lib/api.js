const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) {
 throw new Error('VITE_API_URL is not defined. Did you create a .env file?')
}
export async function apiFetch(path, options = {}) {
 const res = await fetch(`${API_URL}${path}`, {
 headers: {
 'Content-Type': 'application/json',
...options.headers,
 },
 ...options,
 })
 if (!res.ok) {
 const errorBody = await res.json().catch(() => ({}))
  const message =
      errorBody.error ||
      (errorBody.errors ? errorBody.errors.join(', ') : null) ||
      `HTTP ${res.status}: ${res.statusText}`

    throw new Error(message)
  }

  // Handle 204 No Content
  if (res.status === 204) {
    return null
  }

  return res.json()
}