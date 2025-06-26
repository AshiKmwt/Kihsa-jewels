// API utility functions for fetching data from our backend

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;  // Path to the product image
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

// Fetch all products or products by category
export async function getProducts(category?: string): Promise<Product[]> {
  const url = category && category !== 'all' 
    ? `${API_URL}/api/products?category=${category}`
    : `${API_URL}/api/products`;
    
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/api/categories`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Add a product to the cart
export async function addToCart(productId: string, quantity: number = 1): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${API_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: productId,
        quantity,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return {
      success: false,
      message: 'Failed to add product to cart',
    };
  }
} 