import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('shophub-cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      'shophub-cart',
      JSON.stringify(cart)
    )
  }, [cart])

  function addToCart(productId) {

    setCart(prevCart => {

      const existingItem = prevCart.find(
        item => item.id === productId
      )

      if (existingItem) {

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
      prevCart.filter(
        item => item.id !== productId
      )
    )
  }

  function incrementQuantity(productId) {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  function decrementQuantity(productId) {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1
              }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }
function clearCart() {
  setCart([])
}
 const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
const value = useMemo(() => ({
 cart,
 itemCount, // ← derive it
 isCartOpen,
 openCart: () => setIsCartOpen(true), // ← wrap setter
 closeCart: () => setIsCartOpen(false), // ← wrap setter
 addToCart,
 removeFromCart,
 incrementQuantity,
 decrementQuantity,
 clearCart
}), [cart, itemCount, isCartOpen]) // ← dependencies
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {

  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}
export default CartContext;