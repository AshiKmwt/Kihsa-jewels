import Link from 'next/link';
import { FaStar, FaStarHalfAlt, FaRegStar, FaHeart, FaShare } from 'react-icons/fa';
import Header from '@/components/Header';
import Image from 'next/image';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;
  const product = getProductById(id);

  if (!product) {
    return (
      <main>
        <Header />
        <div className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-8">The product you are looking for does not exist or has been removed.</p>
          <Link href="/category/all" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="bg-light py-3">
        <div className="container-custom">
          <nav className="text-sm">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-gray-500 hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li>
                <Link href={`/category/${getCategorySlug(product.category)}`} className="text-gray-500 hover:text-primary">
                  {product.category}
                </Link>
              </li>
              <li className="text-gray-500">/</li>
              <li className="text-primary">{product.name}</li>
            </ol>
          </nav>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      fill
                      className="object-cover hover:opacity-75 transition-opacity"
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
              </div>
              <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 mb-6">
                This exquisite {product.name.toLowerCase()} is meticulously crafted with the finest materials. 
                Perfect for special occasions or as a meaningful gift, this piece embodies timeless elegance and sophistication.
              </p>
              
              {/* Options */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex space-x-3">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button 
                      key={size}
                      className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex items-center mb-8">
                <div className="flex border border-gray-300 rounded-md mr-4">
                  <button className="px-3 py-2 text-xl">-</button>
                  <input 
                    type="number" 
                    min="1" 
                    value="1" 
                    readOnly
                    className="w-12 text-center focus:outline-none"
                  />
                  <button className="px-3 py-2 text-xl">+</button>
                </div>
                <button className="btn-primary flex-1 py-3">Add to Cart</button>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-4 mb-8">
                <button className="flex items-center text-gray-500 hover:text-primary">
                  <FaHeart className="mr-2" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center text-gray-500 hover:text-primary">
                  <FaShare className="mr-2" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Details */}
              <div className="border-t pt-6">
                <div className="mb-4">
                  <span className="font-medium">Material:</span> {getMaterial(product.category)}
                </div>
                <div className="mb-4">
                  <span className="font-medium">Style:</span> Contemporary
                </div>
                <div>
                  <span className="font-medium">SKU:</span> {product.id.padStart(6, '0')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Description Tabs */}
      <section className="py-12 bg-light">
        <div className="container-custom">
          <div className="border-b mb-8">
            <div className="flex flex-wrap -mb-px">
              <button className="inline-block py-4 px-6 border-b-2 border-primary text-primary font-medium">
                Description
              </button>
              <button className="inline-block py-4 px-6 text-gray-500 hover:text-primary">
                Specifications
              </button>
              <button className="inline-block py-4 px-6 text-gray-500 hover:text-primary">
                Reviews (24)
              </button>
              <button className="inline-block py-4 px-6 text-gray-500 hover:text-primary">
                Shipping & Returns
              </button>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <p>
              Introducing our exquisite {product.name}, a true masterpiece of craftsmanship and design. 
              Each piece is meticulously handcrafted by our skilled artisans using only the finest materials 
              sourced from ethical suppliers around the world.
            </p>
            <p className="mt-4">
              The {product.name} features a stunning design that balances contemporary aesthetics with timeless elegance. 
              The attention to detail is evident in every aspect, from the precision of the setting to the quality of the finish. 
              This piece is not just jewelry; it's a statement of sophistication and style.
            </p>
            <p className="mt-4">
              Perfect for special occasions or as an everyday luxury, this {product.category.toLowerCase()} will elevate any outfit 
              and create a lasting impression. It also makes for a meaningful gift that will be treasured for generations to come.
            </p>
            <h3 className="mt-6 font-serif text-xl font-bold">Care Instructions</h3>
            <p className="mt-2">
              To maintain the beauty of your {product.name}, we recommend storing it in a jewelry box when not in use. 
              Clean gently with a soft cloth and avoid exposure to harsh chemicals, perfumes, and extreme temperatures. 
              For professional cleaning, please visit any of our stores.
            </p>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      <section className="py-12">
        <div className="container-custom">
          <h2 className="font-serif text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {getRelatedProducts(id, product.category).map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <Link href={`/product/${relatedProduct.id}`}>
                  <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Image: {relatedProduct.name}</p>
                    </div>
                  </div>
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">{relatedProduct.name}</h3>
                </Link>
                <p className="text-gray-500 mb-2">{relatedProduct.category}</p>
                <p className="font-bold">${relatedProduct.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper functions
function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Rings': 'rings',
    'Necklaces': 'necklaces',
    'Bangles': 'bangles',
    'Earrings': 'earrings',
    'Bracelets': 'bangles', // Map bracelets to bangles category
  };
  
  return categoryMap[category] || 'all';
}

function getMaterial(category: string): string {
  const materialMap: Record<string, string> = {
    'Rings': '18K Gold, Diamonds',
    'Necklaces': '14K Gold, Pearls',
    'Bangles': '18K Gold, Diamonds',
    'Earrings': '14K Gold, Gemstones',
    'Bracelets': '18K Gold, Diamonds',
  };
  
  return materialMap[category] || 'Precious Metals and Gemstones';
}

// Sample data functions
function getProductById(id: string) {
  const allProducts = [
    { id: '1', name: 'Diamond Eternity Ring', category: 'Rings', price: 1299.99, image: '/images/rings/50E4SRFBC2137_1.webp' },
    { id: '2', name: 'Pearl Pendant Necklace', category: 'Necklaces', price: 899.99, image: '/images/necklace/50O4SS2AYDBA32_1.webp' },
    { id: '3', name: 'Gold Bangle Set', category: 'Bangles', price: 1499.99, image: '/images/bangles/512216VJR1B00_1.webp' },
    { id: '4', name: 'Sapphire Drop Earrings', category: 'Earrings', price: 1099.99, image: '/images/earings/510730VZA2B00_1.jpg' },
    { id: '5', name: 'Emerald Tennis Bracelet', category: 'Bracelets', price: 2499.99, image: '/images/bangles/511251VXB1A00.webp' },
    { id: '6', name: 'Ruby Stud Earrings', category: 'Earrings', price: 799.99, image: '/images/earings/513220VJP2A00_1.webp' },
    { id: '7', name: 'Platinum Wedding Band', category: 'Rings', price: 1899.99, image: '/images/rings/50E4SRFANA737_1.webp' },
    { id: '8', name: 'Diamond Choker Necklace', category: 'Necklaces', price: 3299.99, image: '/images/necklace/50O4SS2ATDBA32_1.webp' },
    { id: '9', name: 'Vintage Inspired Ring', category: 'Rings', price: 1599.99, image: '/images/rings/510122FAAAA00.webp' },
    { id: '10', name: 'Gold Chain Necklace', category: 'Necklaces', price: 1199.99, image: '/images/necklace/51O4DP2AI1BA00_1.webp' },
    { id: '11', name: 'Silver Bangle with Diamonds', category: 'Bangles', price: 999.99, image: '/images/bangles/513220VJP2A00_1.webp' },
    { id: '12', name: 'Pearl Stud Earrings', category: 'Earrings', price: 499.99, image: '/images/earings/510228VEA2B00_1.webp' },
  ];
  
  return allProducts.find(product => product.id === id);
}

function getRelatedProducts(currentId: string, category: string) {
  const allProducts = [
    { id: '1', name: 'Diamond Eternity Ring', category: 'Rings', price: 1299.99, image: '/images/rings/50E4SRFBC2137_1.webp' },
    { id: '2', name: 'Pearl Pendant Necklace', category: 'Necklaces', price: 899.99, image: '/images/necklace/50O4SS2AYDBA32_1.webp' },
    { id: '3', name: 'Gold Bangle Set', category: 'Bangles', price: 1499.99, image: '/images/bangles/512216VJR1B00_1.webp' },
    { id: '4', name: 'Sapphire Drop Earrings', category: 'Earrings', price: 1099.99, image: '/images/earings/510730VZA2B00_1.jpg' },
    { id: '5', name: 'Emerald Tennis Bracelet', category: 'Bracelets', price: 2499.99, image: '/images/bangles/511251VXB1A00.webp' },
    { id: '6', name: 'Ruby Stud Earrings', category: 'Earrings', price: 799.99, image: '/images/earings/513220VJP2A00_1.webp' },
    { id: '7', name: 'Platinum Wedding Band', category: 'Rings', price: 1899.99, image: '/images/rings/50E4SRFANA737_1.webp' },
    { id: '8', name: 'Diamond Choker Necklace', category: 'Necklaces', price: 3299.99, image: '/images/necklace/50O4SS2ATDBA32_1.webp' },
    { id: '9', name: 'Vintage Inspired Ring', category: 'Rings', price: 1599.99, image: '/images/rings/510122FAAAA00.webp' },
    { id: '10', name: 'Gold Chain Necklace', category: 'Necklaces', price: 1199.99, image: '/images/necklace/51O4DP2AI1BA00_1.webp' },
    { id: '11', name: 'Silver Bangle with Diamonds', category: 'Bangles', price: 999.99, image: '/images/bangles/513220VJP2A00_1.webp' },
    { id: '12', name: 'Pearl Stud Earrings', category: 'Earrings', price: 499.99, image: '/images/earings/510228VEA2B00_1.webp' },
  ];
  
  // Get products in the same category, excluding the current product
  const relatedProducts = allProducts.filter(product => 
    product.category === category && product.id !== currentId
  );
  
  // Return up to 4 related products
  return relatedProducts.slice(0, 4);
} 