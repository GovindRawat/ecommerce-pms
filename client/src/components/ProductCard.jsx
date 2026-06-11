import Button from './Button'
function ProductCard ({ id, name, description, price, image, inStock, onAddToCart })  
{
 function handleAddToCart() {
    onAddToCart(id)
    console.log(onAddToCart)
 }
 return (
 <article className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
 <img 
 src={image}
 alt={name}
 className="w-full aspect-square object-cover"
 />
 <div className="p-4 flex flex-col flex-1">
 <h3 className="font-semibold text-lg mb-1">{name}</h3>
 <p className="text-gray-600 text-sm mb-3 flex-1">{description}</p>
 <div className="flex items-center justify-between mt-auto">
 <span className="text-xl font-bold text-blue-700">
 ${price.toFixed(2)}
 </span>
 {inStock ? (
 <Button onClick={handleAddToCart}>Add to Cart</Button>
) : (
 <span className="text-red-500 font-medium">Out of Stock</span>
)}
 </div>
 </div>
 </article>
 );
}
export default ProductCard;