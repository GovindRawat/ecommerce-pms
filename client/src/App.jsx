import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import { products } from './data/products'
import CartSidebar from './components/CartSidebar'

function App() {
 const [cart, setCart] = useState(() => {
 try {
 const stored = localStorage.getItem('shophub-cart')
 return stored ? JSON.parse(stored) : []
 } catch {
 return []
 }
})
  const [isCartOpen, setIsCartOpen] = useState(false)
function addToCart(productId) {
 setCart(prevCart => {
 // Is this product already in the cart?
 const existingItem = prevCart.find(item => item.id === productId)
 if (existingItem) {
 // Increase quantity by 1
   return prevCart.map(item =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      }
      return [
        ...prevCart,
        {
          id: productId,
          quantity: 1
        }
      ]
    })
  }
  function removeFromCart(productId) {
  setCart(prevCart =>
    prevCart.filter(item => item.id !== productId)
  )
}

function incrementQuantity(productId) {
  setCart(prevCart =>
    prevCart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  )
}

function decrementQuantity(productId) {
  setCart(prevCart =>
    prevCart
      .map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  )
}
useEffect(() => {
  localStorage.setItem(
    'shophub-cart',
    JSON.stringify(cart)
  )
}, [cart])
  return (
    <>
     <Header
      cart={cart}
        onCartClick={() => setIsCartOpen(true)}
         />
<main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <Hero />
 <ProductGrid products={products} onAddToCart={addToCart} />
    <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        products={products}
        onIncrement={incrementQuantity}
        onDecrement={decrementQuantity}
        onRemove={removeFromCart}
      />
</main>
<Footer />
    </>
  )
}

export default App;