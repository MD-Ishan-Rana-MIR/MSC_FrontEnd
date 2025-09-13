import React, { useState } from 'react';

const Wishlist = () => {
  // Sample initial wishlist data
  const initialWishlist = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 89.99,
      originalPrice: 119.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Headphones",
      inStock: true,
      rating: 4.5
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 159.99,
      originalPrice: 199.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Smart+Watch",
      inStock: true,
      rating: 4.8
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Shoes",
      inStock: false,
      rating: 4.2
    },
    {
      id: 4,
      name: "Designer Backpack",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Backpack",
      inStock: true,
      rating: 4.3
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      price: 59.99,
      originalPrice: 79.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Speaker",
      inStock: true,
      rating: 4.6
    },
    {
      id: 6,
      name: "Smart Home Hub",
      price: 129.99,
      originalPrice: 149.99,
      image: "https://via.placeholder.com/300/CCCCCC/333333?text=Smart+Home",
      inStock: false,
      rating: 4.1
    }
  ];

  const [wishlist, setWishlist] = useState(initialWishlist);
  const [sortBy, setSortBy] = useState('date');
  const [filterInStock, setFilterInStock] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Remove item from wishlist
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  // Move item to cart
  const moveToCart = (id) => {
    // In a real app, this would add to cart and remove from wishlist
    alert(`Item moved to cart!`);
    removeFromWishlist(id);
  };

  // Sort wishlist
  const sortWishlist = (criteria) => {
    setSortBy(criteria);
    const sorted = [...wishlist];

    switch (criteria) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Default is by date added (original order)
        break;
    }

    setWishlist(sorted);
  };

  // Filter by stock status
  const filteredWishlist = filterInStock
    ? wishlist.filter(item => item.inStock)
    : wishlist;

  // Share wishlist
  const shareWishlist = (method) => {
    const message = `Check out my wishlist! It has ${wishlist.length} items.`;
    switch (method) {
      case 'copy':
        navigator.clipboard.writeText(message);
        alert('Wishlist link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=My Wishlist&body=${message}`;
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  };

  // Calculate total value
  const totalValue = wishlist.reduce((total, item) => total + item.price, 0);
  const originalTotalValue = wishlist.reduce((total, item) => total + (item.originalPrice || item.price), 0);
  const totalSavings = originalTotalValue - totalValue;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="mt-2 text-sm text-gray-600">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={sortBy}
                onChange={(e) => sortWishlist(e.target.value)}
              >
                <option value="date">Sort by: Date Added</option>
                <option value="price-low">Sort by: Price Low to High</option>
                <option value="price-high">Sort by: Price High to Low</option>
                <option value="name">Sort by: Name</option>
                <option value="rating">Sort by: Rating</option>
              </select>
            </div>

            <div className="relative">
              <button
                className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setFilterInStock(!filterInStock)}
              >
                {filterInStock ? 'Show All Items' : 'Show Only In Stock'}
              </button>
            </div>

            <div className="relative">
              <button
                className="w-full bg-indigo-600 border border-transparent rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowShareOptions(!showShareOptions)}
              >
                Share Wishlist
              </button>

              {showShareOptions && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    <button
                      onClick={() => shareWishlist('copy')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => shareWishlist('email')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Email Wishlist
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your wishlist is empty</h3>
            <p className="mt-1 text-sm text-gray-500">Start adding items you love to your wishlist.</p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Original Value</p>
                  <p className="text-2xl font-bold text-gray-900 line-through">${originalTotalValue.toFixed(2)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">You'll Save</p>
                  <p className="text-2xl font-bold text-green-900">${totalSavings.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWishlist.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {!item.inStock && (
                      <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        Out of Stock
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
                      aria-label="Remove from wishlist"
                    >
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <div className="p-4 flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>

                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-sm text-gray-600">({item.rating})</span>
                    </div>

                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="ml-2 text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <button
                      onClick={() => moveToCart(item.id)}
                      disabled={!item.inStock}
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${item.inStock
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                      {item.inStock ? 'Move to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;