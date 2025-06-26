import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-dark opacity-40 z-10"></div>
            <Image
              src="/images/necklace/51O4MR2AF1BA00_1.webp"
              alt="Kihsa Jewels Collection - Crystal Drop Necklace"
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
          </div>
        </div>
        <div className="container-custom relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4">Exquisite Jewelry for Every Occasion</h1>
            <p className="text-lg mb-8">Discover our handcrafted collection of fine jewelry that celebrates your unique style and elegance.</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/category/all" className="btn-primary">
                Shop Collection
              </Link>
              <Link href="/about" className="btn-secondary">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] w-full max-h-[700px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/images/home.webp"
                alt="Our Jewelry Collection"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">Welcome to Kihsa Jewels</h2>
              <p className="text-gray-600 mb-6 text-lg">
                At Kihsa Jewels, we believe that every piece of jewelry tells a story. Our collection is carefully curated 
                to bring you the finest handcrafted pieces that combine traditional craftsmanship with contemporary design.
              </p>
              <p className="text-gray-600 mb-10 text-lg">
                From stunning engagement rings to elegant necklaces, each piece is created with meticulous attention to detail 
                and a commitment to excellence that has been our hallmark since inception.
              </p>
              <Link href="/about" className="btn-primary text-lg px-8 py-4">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                href={`/category/${category.slug}`} 
                key={category.slug}
                className="group"
              >
                <div className="relative h-80 overflow-hidden rounded-lg mb-4">
                  <div className="absolute inset-0 bg-dark opacity-20 group-hover:opacity-30 transition-opacity z-10"></div>
                  <Image
                    src={`/images/${category.slug}/${category.coverImage}`}
                    alt={category.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <h3 className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-2xl font-serif font-medium z-20">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">Featured Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-500 mb-2">{product.category}</p>
                <div className="flex justify-between items-center">
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                  <button className="btn-primary text-sm py-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/category/all" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-8">Subscribe to receive updates on new collections, special offers, and jewelry care tips.</p>
            <form className="flex flex-col md:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md text-dark focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button type="submit" className="btn-secondary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Kihsa Jewels</h3>
              <p className="text-gray-400 mb-4">Exquisite jewelry for every occasion. Handcrafted with love and attention to detail.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-secondary">FB</a>
                <a href="#" className="text-white hover:text-secondary">IG</a>
                <a href="#" className="text-white hover:text-secondary">TW</a>
                <a href="#" className="text-white hover:text-secondary">PT</a>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/category/rings" className="text-gray-400 hover:text-white">Rings</Link></li>
                <li><Link href="/category/necklaces" className="text-gray-400 hover:text-white">Necklaces</Link></li>
                <li><Link href="/category/bangles" className="text-gray-400 hover:text-white">Bangles</Link></li>
                <li><Link href="/category/earrings" className="text-gray-400 hover:text-white">Earrings</Link></li>
                <li><Link href="/category/all" className="text-gray-400 hover:text-white">All Jewelry</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">About</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Our Story</Link></li>
                <li><Link href="/craftsmanship" className="text-gray-400 hover:text-white">Craftsmanship</Link></li>
                <li><Link href="/materials" className="text-gray-400 hover:text-white">Materials</Link></li>
                <li><Link href="/sustainability" className="text-gray-400 hover:text-white">Sustainability</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping & Returns</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                <li><Link href="/care" className="text-gray-400 hover:text-white">Jewelry Care</Link></li>
                <li><Link href="/size-guide" className="text-gray-400 hover:text-white">Size Guide</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Kihsa Jewels. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Sample data
const categories = [
  { name: 'Rings', slug: 'rings', coverImage: '50E4SRFBC2137_1.webp' },
  { name: 'Necklaces', slug: 'necklace', coverImage: '50O4SS2AYDBA32_1.webp' },
  { name: 'Bangles', slug: 'bangles', coverImage: '512216VJR1B00_1.webp' },
  { name: 'Earrings', slug: 'earings', coverImage: '510730VZA2B00_1.jpg' },
];

const featuredProducts = [
  { id: '1', name: 'Diamond Eternity Ring', category: 'Rings', price: 1299.99, image: '/images/rings/50E4SRFBC2137_1.webp' },
  { id: '2', name: 'Pearl Pendant Necklace', category: 'Necklaces', price: 899.99, image: '/images/necklace/50O4SS2AYDBA32_1.webp' },
  { id: '3', name: 'Gold Bangle Set', category: 'Bangles', price: 1499.99, image: '/images/bangles/512216VJR1B00_1.webp' },
  { id: '4', name: 'Sapphire Drop Earrings', category: 'Earrings', price: 1099.99, image: '/images/earings/510730VZA2B00_1.jpg' },
  { id: '5', name: 'Emerald Tennis Bracelet', category: 'Bracelets', price: 2499.99, image: '/images/bangles/511251VXB1A00.webp' },
  { id: '6', name: 'Ruby Stud Earrings', category: 'Earrings', price: 799.99, image: '/images/earings/513220VJP2A00_1.webp' },
  { id: '7', name: 'Platinum Wedding Band', category: 'Rings', price: 1899.99, image: '/images/rings/50E4SRFANA737_1.webp' },
  { id: '8', name: 'Diamond Choker Necklace', category: 'Necklaces', price: 3299.99, image: '/images/necklace/50O4SS2ATDBA32_1.webp' },
  { id: '9', name: 'Crystal Drop Necklace', category: 'Necklaces', price: 1599.99, image: '/images/necklace/51O4MR2AF1BA00_1.webp' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'New York, NY',
    text: 'The craftsmanship of my engagement ring is absolutely stunning. I receive compliments everywhere I go!'
  },
  {
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    text: 'I purchased a necklace for my wife\'s birthday and she was thrilled. The quality exceeded our expectations.'
  },
  {
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    text: 'The customer service was exceptional and they helped me find the perfect pair of earrings for my wedding day.'
  },
]; 