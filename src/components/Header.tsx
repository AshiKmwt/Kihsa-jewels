"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaShoppingCart, FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isCartOpen) setIsCartOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl md:text-3xl font-bold text-primary">
            Kihsa Jewels
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-dark hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/category/rings" className="text-dark hover:text-primary transition-colors">
              Rings
            </Link>
            <Link href="/category/necklace" className="text-dark hover:text-primary transition-colors">
              Necklaces
            </Link>
            <Link href="/category/bangles" className="text-dark hover:text-primary transition-colors">
              Bangles
            </Link>
            <Link href="/category/earings" className="text-dark hover:text-primary transition-colors">
              Earrings
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="text-dark hover:text-primary transition-colors">
              <FaSearch size={20} />
            </button>
            <button className="text-dark hover:text-primary transition-colors">
              <FaUser size={20} />
            </button>
            <button 
              className="text-dark hover:text-primary transition-colors relative"
              onClick={toggleCart}
            >
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondary text-dark text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-dark hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t mt-4">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-dark hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/category/rings" className="block text-dark hover:text-primary transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/category/necklaces" className="block text-dark hover:text-primary transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/category/bangles" className="block text-dark hover:text-primary transition-colors">
                  Bangles
                </Link>
              </li>
              <li>
                <Link href="/category/earrings" className="block text-dark hover:text-primary transition-colors">
                  Earrings
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleCart}></div>
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform">
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Your Cart ({totalItems})</h2>
                <button onClick={toggleCart} className="text-dark hover:text-primary">
                  <FaTimes size={24} />
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <ul className="space-y-4">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex items-center space-x-4 border-b pb-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">
                          <FaTimes />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between mb-4">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    ${cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                <button className="btn-primary w-full">
                  Checkout
                </button>
                <button className="mt-2 w-full text-center text-primary hover:underline">
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 