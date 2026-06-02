function Header() {
 return (
 <header className="bg-white shadow-sm border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex items-center justify-between h-16">
 <h1 className="text-2xl font-bold text-blue-700">
 ShopHub
 </h1>
 <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-8">
 <a href="#" className="font-medium hover:text-blue-700
transition">Home</a>
 <a href="#products" className="font-medium hover:text-blue-700
transition">Products</a>
 <a href="#" className="font-medium hover:text-blue-700
transition">Cart</a>
 <a href="#" className="font-medium hover:text-blue-700
 transition">Login</a>
 </nav>
 </div>
 </div>
 </header>
 );
 }

 export default Header;