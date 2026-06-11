import ProductCard from './ProductCard'
function ProductGrid({ products, onAddToCart }) {
 return (
 <section id="products" aria-labelledby="products-heading">
 <h2 id="products-heading" className="text-2xl font-bold mb-6">
 Featured Products
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
gap-6">
 {products.map(product => (
 <ProductCard
 key={product.id}
 {...product}
 onAddToCart={onAddToCart} />
 ))}
 </div>
 </section>
 )
}
export default ProductGrid;