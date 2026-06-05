const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
     <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* <!-- COLUMN 1 --> */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">
                        ShopHub
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                         &copy; {currentYear} My Store. All rights reserved.
                    </p>
                </div>
                {/* <!-- COLUMN 2 --> */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Quick Links
                    </h4>
                    <ul className="space-y-3">
                        <li>
                            <a href="#"
                               className="hover:text-blue-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#products"
                               className="hover:text-blue-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="hover:text-blue-400 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-md">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                {/* <!-- COLUMN 3 --> */}
                <div>
                    <h4 className="text-lg font-semibold mb-4">
                        Contact
                    </h4>
                    <p className="text-gray-400 mb-3">
                        Email: support@shophub.com
                    </p>
                    <p className="text-gray-400">
                        Phone: +91 8126274079
                    </p>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;