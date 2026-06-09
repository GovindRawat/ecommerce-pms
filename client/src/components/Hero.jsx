import Button from './Button'
const Hero = () => {
 return (
  <section className="bg-blue-700 text-white">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="max-w-3xl">
    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-6">
                        Discover Premium Products For Everyday Life
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-8 leading-relaxed">
                        Explore electronics, fashion, accessories and more with high quality products and fast delivery.
                    </p>
                    <Button  variant="inverse" onClick={() => console.log("Navigating to Shop...")}>
                        Shop Now
                    </Button>
                </div>
            </div>
    </section>
 );
};
export default Hero;