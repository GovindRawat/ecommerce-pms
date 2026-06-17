import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { CartProvider } from './context/CartContext'
import { ProductsProvider } from './context/ProductsContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </StrictMode>
)