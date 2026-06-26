import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useProductsContext } from '../context/ProductsContext'
import { apiFetch } from '../lib/api'
import Button from './Button'
function CartSidebar() {
  const {
    cart,
    isCartOpen,
    closeCart,
    clearCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
  } = useCart()

  const { products } = useProductsContext()

  const [orderStatus, setOrderStatus] = useState(null)
  const [ordering, setOrdering] = useState(false)

  const closeButtonRef = useRef(null)

  async function handleCheckout() {
    if (cart.length === 0) return

    setOrdering(true)
    setOrderStatus(null)

    try {
      const order = await apiFetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      })
       console.log('Order response:', order)
      setOrderStatus({
        success: true,
        orderId: order.id,
      })

      clearCart()

    } catch (err) {
       console.error('Checkout error:', err)

      setOrderStatus({
        error: err.message,
      })
    } finally {
      setOrdering(false)
    }
  }

  // Escape key listener
  useEffect(() => {
    if (!isCartOpen) return

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeCart()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      )
    }
  }, [isCartOpen, closeCart])

  // Body scroll lock
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  // Join cart data with product data
  const cartItems = cart
    .map(cartItem => {
      const product = products.find(
        p => p.id === cartItem.id
      )

      if (!product) return null

      return {
        ...product,
        quantity: cartItem.quantity,
      }
    })
    .filter(Boolean)

  // Derived total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!isCartOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        role="dialog"
        aria-label="Shopping Cart"
        className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            Shopping Cart
          </h2>

          <button
            ref={closeButtonRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="text-2xl font-bold hover:text-red-600 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
          >
            ×
          </button>
        </div>

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {item.name}
                    </h3>

                    <p className="text-blue-700 font-bold">
                      ₹{item.price}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          decrementQuantity(item.id)
                        }
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          incrementQuantity(item.id)
                        }
                        className="px-2 py-1 border rounded hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="mt-2 text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>

                <span>
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              {orderStatus?.success && (
                <p
                  role="status"
                  className="text-green-600 text-sm font-medium mt-3"
                >
                  Order #{orderStatus.orderId} placed
                  successfully!
                </p>
              )}

              {orderStatus?.error && (
                <p
                  role="alert"
                  className="text-red-600 text-sm mt-3"
                >
                  {orderStatus.error}
                </p>
              )}

              <Button
                onClick={handleCheckout}
                disabled={
                  ordering || cart.length === 0
                }
                className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {ordering
                  ? 'Placing order...'
                  : 'Place Order'}
              </Button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartSidebar