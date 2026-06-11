import { useEffect, useRef } from 'react'

function CartSidebar({
  isOpen,
  onClose,
  cart,
  products,
  onIncrement,
  onDecrement,
  onRemove
}) {

  const closeButtonRef = useRef(null)

    // Escape key listener
useEffect(() => {

  if (!isOpen) return

  function handleKeyDown(event) {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener(
      'keydown',
      handleKeyDown
    )
  }

}, [isOpen, onClose])


// Body scroll lock
useEffect(() => {

  if (isOpen) {
    document.body.style.overflow = 'hidden'
  }

  return () => {
    document.body.style.overflow = ''
  }

}, [isOpen])


  // Join cart data with product data
  const cartItems = cart.map(cartItem => {
    const product = products.find(
      p => p.id === cartItem.id
    )

    return {
      ...product,
      quantity: cartItem.quantity
    }
  })

  // Derived total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
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
            onClick={onClose}
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
                        onClick={() => onDecrement(item.id)}
                        className="px-2 py-1 border rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => onIncrement(item.id)}
                        className="px-2 py-1 border rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        +
                      </button>

                    </div>

                    {/* Remove */}

                    <button
                      onClick={() => onRemove(item.id)}
                      className="mt-2 text-red-600 hover:text-red-700 text-sm focus:ring-2 focus:ring-red-500 rounded"
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

            </div>

          </>
        )}

      </aside>
    </>
  )
}

export default CartSidebar;