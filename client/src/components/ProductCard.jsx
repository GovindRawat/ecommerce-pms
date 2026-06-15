import Button from './Button'
import {useCart} from '../context/CartContext'
function ProductCard({ id, name, description, price, image, inStock }) {
 const { addToCart } = useCart();

 return (
 <article className="bg-white border border-gray-200 rounded-lg shadow-sm
hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
 <img src={image} alt={name} className="w-full aspect-square object-cover" />
 <div className="p-4 flex flex-col flex-1">
 <h3 className="font-semibold text-lg mb-1">{name}</h3>
 <p className="text-gray-600 text-sm mb-3 flex-1">{description}</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="text-xl font-bold text-blue-700">
 ${price.toFixed(2)}
 </span>
 {inStock ? (
 <Button onClick={() => addToCart(id)}>
 Add to Cart
 </Button>
 ) : (
 <span className="text-red-500 font-medium">Out of Stock</span>
)}
 </div>
 </div>
 </article>
 );
}
export default ProductCard;