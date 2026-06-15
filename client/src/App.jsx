import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import { products } from './data/products'
import CartSidebar from './components/CartSidebar'

function App() {
 return (
 <>
 <Header />
 <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <Hero />
 <ProductGrid products={products} />
 </main>
 <CartSidebar />
<Footer />
    </>
  )
}

export default App;