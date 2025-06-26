import Link from 'next/link';
import Header from '@/components/Header';
import Image from 'next/image';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const category = getCategoryBySlug(slug);
  const products = getProductsByCategory(slug);

  return (
    <main>
      <Header />
      
      {/* Category Header */}
      <section className="py-12 bg-light">
        <div className="container-custom">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">{category?.name || 'All Jewelry'}</h1>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            {category?.description || 'Explore our exquisite collection of fine jewelry pieces, each crafted with precision and care.'}
          </p>
        </div>
      </section>
      
      {/* Filter and Sort */}
      <section className="py-6 border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-600">Filter:</span>
              <select className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Price Range</option>
                <option value="0-500">$0 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2500">$1,000 - $2,500</option>
                <option value="2500+">$2,500+</option>
              </select>
              <select className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Material</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="platinum">Platinum</option>
                <option value="rose-gold">Rose Gold</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Sort by:</span>
              <select className="border rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="bestselling">Best Selling</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Grid */}
      <section className="py-12">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found in this category.</p>
              <Link href="/category/all" className="mt-4 inline-block btn-primary">
                View All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
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
          )}
        </div>
      </section>
    </main>
  );
}

// Sample data functions
function getCategoryBySlug(slug: string) {
  const categories = [
    { 
      name: 'Rings', 
      slug: 'rings',
      description: 'Discover our stunning collection of rings, from elegant engagement rings to statement pieces.'
    },
    { 
      name: 'Necklaces', 
      slug: 'necklace',
      description: 'Explore our exquisite necklaces, crafted with the finest materials to elevate any outfit.'
    },
    { 
      name: 'Bangles', 
      slug: 'bangles',
      description: 'Browse our beautiful bangles and bracelets, perfect for adding a touch of elegance to your wrist.'
    },
    { 
      name: 'Earrings', 
      slug: 'earings',
      description: 'Find the perfect pair of earrings, from subtle studs to dramatic drops for any occasion.'
    },
  ];
  
  return categories.find(category => category.slug === slug);
}

function getProductsByCategory(slug: string) {
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
  
  if (slug === 'all') {
    return allProducts;
  }
  
  const categoryMap: Record<string, string> = {
    'rings': 'Rings',
    'necklace': 'Necklaces',
    'bangles': 'Bangles',
    'earings': 'Earrings',
  };
  
  return allProducts.filter(product => product.category === categoryMap[slug]);
} 