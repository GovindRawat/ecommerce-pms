import { createContext, useContext } from 'react'
import { useProducts } from '../hooks/useProducts'

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const productsData = useProducts()

  return (
    <ProductsContext.Provider value={productsData}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProductsContext() {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider'
    )
  }

  return context
}