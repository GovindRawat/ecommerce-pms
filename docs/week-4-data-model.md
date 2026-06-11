# 1 What state does the cart need?
A cart should contain enough information to display items, calculate totals, and update quantities.
A practical cart structure could be: 
const cart=[
    {
        id:101;
        quantity:2;
    },
    {
        id:102;
        quantity:3;
    }
];
The cart's main job is to remember which product was added(id) and how many was added(quantity).
Everything else can usually be looked up from the product database or product list.
For example:
js
const products=[
    {
       id: 4,
       name: 'Nike Air Max',
       description: 'Comfortable and stylish sneakers designed for everyday wear and sports activities.',
       price: 4999,
       image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?text=Nike%20Air%20Max&fit=crop&w=400&h=400',
       inStock: true,
    }
];
When rendering the cart, we match the cart item's id with the product data.
In minimal cart, we only need id and quantity as no duplicate data,Easier to maintain and if product name or image changes, cart automatically shows latest data. But this cart Requires looking up product information every time.
Bonus question:should the cart be an array or an object? Both are valid. Pick one.
Defend it.
For a small project built with HTML, JavaScript, and later React, I would choose: Arrays because:
1.Product lists are naturally arrays.
2.Rendering cart items with .map() is straightforward.
3.The cart size is usually small, so lookup performance is not a concern.
4.It keeps the data structure simple and easy to understand.

If I were building a very large ecommerce application with thousands of cart operations, I would consider an object (or a Map) for faster lookups.

# 2. Where does that state live?
The cart state should live in the lowest common ancestor of every component that needs to read or modify it.
The cart is needed by:
-ProductCard (to add items)
-Header (to show item count)
-CartPage (to display cart contents)
Since all of these components need access to the cart, the cart state should live in App.
What if the state lives inside ProductCard?
This causes a problem because every ProductCard gets its own separate cart.
Imagine:
ProductCard A → cart = [Nike Shoes]
ProductCard B → cart = []
ProductCard C → cart = []
If a user adds shoes from Card A:
Header won't know
Cart page won't know
Other cards won't know
Each card manages its own isolated state.
So the application no longer has one cart, it has many tiny carts.
That's wrong.
What if the state lives in ProductGrid?
This solves one problem because all ProductCards can share the same cart.
However:
ProductGrid
├── ProductCard
├── ProductCard
├── ProductCard
Now ProductCards can add items correctly.
But the Header still needs the cart count:
App
├── Header
├── ProductGrid
└── CartPage
Header is not inside ProductGrid.
CartPage is not inside ProductGrid.
Therefore:
Header cannot show "Cart (3)"
Cart page cannot display cart contents
The state is still too low in the component tree.
Why App is the correct place

App is the first component that is a common ancestor of:
Header
ProductGrid
CartPage
So App can hold:
const [cart, setCart] = useState([]);
and pass it down as props:
Now:
ProductCard can add items
Header can show cart count
CartPage can display products
Everyone stays synchronized

The cart state should live in the lowest common ancestor of all components that need access to it. If the state lives inside ProductCard, each card gets its own separate cart, which breaks the application. If it lives inside ProductGrid, ProductCards can share the cart, but the Header and CartPage cannot access it. Since ProductCards, Header, and CartPage all need the cart state, the correct location is App, which is their common ancestor. This follows React's principle of lifting state up so that there is a single source of truth for shared data.

# 3. Which components need to read the cart state?
The Header should show:
Cart item count
Example:
 Cart (3)
Users mainly need a quick indicator that items exist in the cart.
The Header should read the cart state to display the total number of items in the cart, such as "Cart (3)". For a simple ecommerce application, I would not show the total price in the header because space is limited and users mainly need a quick cart indicator.

Cart Page
The Cart Page needs the most information.The Cart Page should display all cart contents, including product information, quantities, individual subtotals, remove buttons, and the overall cart total.
It should show:
Product details
Nike Air Max
₹4999
Quantity: 2
Image
Quantity controls
Remove button
Item subtotal 
Cart total
The Cart Page's job is to let users review and modify their cart before purchasing.

Checkout Page
The Checkout Page should read the cart state to generate an order summary, showing the selected products, total item count, subtotal, taxes, shipping costs, and final amount payable. These components all depend on the cart state because they present different views of the same underlying shopping cart data.
It should show:
Order summary
Nike Air Max × 2
Smart Watch × 1
Total number of items
Items: 3
Final price
Subtotal: ₹12497
Shipping: ₹100
Tax: ₹250
Grand Total: ₹12847

# 4. Which components need to modify it?
The ProductCard needs permission to modify the cart because it adds products when the user clicks "Add to Cart". A CartItem needs to modify the cart by increasing quantity, decreasing quantity, and removing an item entirely. The Cart Page needs to perform actions that affect the whole cart, such as clearing all items. The Checkout Page modifies the cart when an order is successfully placed, usually by emptying the cart. These components require write access because they directly change the cart state rather than simply displaying it.
1. ProductCard
What action does it perform?
Add item to cart
When the user clicks:
Add to Cart
the ProductCard should update the cart state.
Example:
Nike Air Max
[Add to Cart]

After clicking:
cart = [
  { id: 4, quantity: 1 }
]
Why does ProductCard need modification access?
Because it is the first place where users select products to purchase.

2. CartItem
A CartItem represents a single item inside the cart.
Example:
Nike Air Max
[-] 2 [+]

Remove
Action 1: Increase quantity
[+]

Example:

quantity: 2 → quantity: 3
Action 2: Decrease quantity
[-]

Example:

quantity: 2 → quantity: 1
Action 3: Remove item
Remove

Example:

Before:
[
  { id: 101, quantity: 2 },
  { id: 205, quantity: 1 }
]

After:
[
  { id: 205, quantity: 1 }
]

So a CartItem typically performs:

Increase quantity
Decrease quantity
Remove item
3. Cart Page
The Cart Page manages actions affecting the entire cart.
Action 1: Clear Cart

Example:

Clear Cart

Before:

[
  { id: 101, quantity: 2 },
  { id: 205, quantity: 1 }
]

After:

[]
Action 2: Proceed to Checkout

This may not directly modify the cart immediately, but after successful order placement:

cart = [];

The cart is emptied because the purchase is complete.

4. Checkout Page
What action does it perform?
Place Order

Example:
Place Order
After successful payment:
cart = [];
This clears the cart and completes the shopping process.

# 5. Draw the data flow.
The cart state lives in App because it is the lowest common ancestor shared by the Header, ProductGrid, CartPage, and CheckoutPage. State flows downward from App to child components through props. User actions flow upward through callback functions. Components such as ProductCard and CartItem do not own the cart state; they request changes by calling functions passed down from App. This creates a single source of truth and keeps all parts of the UI synchronized.

## Side effects in the cart
- localStorage write: triggered by cart change (App.jsx)
- localStorage read: lazy initializer (App.jsx)
- Escape key listener: tied to isOpen (CartSidebar.jsx)
- Body scroll lock: tied to isOpen (CartSidebar.jsx)
- Focus management: tied to isOpen (CartSidebar.jsx)
All cleanup functions correctly remove their side effects.
