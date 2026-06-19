import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import { useProductsContext } from './context/ProductsContext'
import AddProductForm from './components/AddProductForm'

function App() {
  const { products, loading, error } = useProductsContext()

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Hero />

        {loading && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6"
            role="alert"
          >
            <p className="font-medium">Failed to load products</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
 <>
 <AddProductForm />
 <ProductGrid products={products} />
 </>
)}
      </main>

      <Footer />
      <CartSidebar />
    </>
  )
}

export default App;