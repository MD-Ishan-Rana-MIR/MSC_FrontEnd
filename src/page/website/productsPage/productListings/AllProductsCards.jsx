import useAxiosPublic from '@/hooks/useAxiosPublic';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';


// Filter options will be generated dynamically from the API data

const viewOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
];

const AllProductsCards = () => {


  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axiosPublic.get('/product-by-category/68bd2537d24d7a97b0ffb812');
      return res?.data?.data;
    }
  })

  console.log(products);

  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');
  const [wishlistItems, setWishlistItems] = useState(new Set());
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("user-token");
    return !!token;
  };

  // Wishlist mutation
  const wishlistMutation = useMutation({
    mutationFn: async (productId) => {
      try {
        const res = await axiosSecure.post('/add-to-wish', {
          productId: productId
        });

        // Check if the response indicates success
        if (res.data && res.data.success !== false) {
          return { success: true, data: res.data, productId };
        } else {
          throw new Error(res.data?.message || 'Failed to update wishlist');
        }
      } catch (error) {
        // Handle different types of errors
        if (error.response) {
          // Server responded with error status
          throw new Error(error.response.data?.message || `Server error: ${error.response.status}`);
        } else if (error.request) {
          // Network error
          throw new Error('Network error. Please check your connection.');
        } else {
          // Other errors
          throw new Error(error.message || 'An unexpected error occurred');
        }
      }
    },
    onSuccess: (result, productId) => {
      const isInWishlist = wishlistItems.has(productId);
      const message = isInWishlist ? 'Product removed from wishlist' : 'Product added to wishlist';
      toast.success(message);

      // Toggle wishlist state
      setWishlistItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(productId)) {
          newSet.delete(productId);
        } else {
          newSet.add(productId);
        }
        return newSet;
      });

      console.log('Wishlist updated:', result);
    },
    onError: (error) => {
      const errorMessage = error.message || 'Error updating wishlist';
      toast.error(errorMessage);
      console.error('Wishlist error:', error);
    }
  });

  const handleWishlistClick = (e, productId) => {
    e.preventDefault(); // Prevent navigation when clicking the heart icon
    e.stopPropagation();

    // Check if user is authenticated
    if (!isAuthenticated()) {
      toast.error('Please login to add items to wishlist');
      navigate('/auth');
      return;
    }

    wishlistMutation.mutate(productId);
  };

  // Map API data to component format
  const mappedProducts = products?.map(product => ({
    id: product._id,
    name: product.product_name,
    department: product.product_type,
    price: `$${product.price}`,
    sale: `$${product.discount_price}`,
    image: product.product_image_1 || 'https://placehold.co/600x400',
    colors: product.product_color?.map(color => color.code) || [],
    size: product.size
  })) || [];

  // Generate filter options dynamically from product types
  const uniqueProductTypes = [...new Set(mappedProducts.map(p => p.department))];
  const filterOptions = [
    { label: 'All', value: 'all' },
    ...uniqueProductTypes.map(type => ({ label: type, value: type }))
  ];

  const filteredProducts =
    filter === 'all'
      ? mappedProducts
      : mappedProducts.filter((p) => p.department === filter);

  if (isLoading) {
    return <div className="container mx-auto sm:px-8 text-center py-8">Loading products...</div>;
  }

  if (error) {
    return <div className="container mx-auto sm:px-8 text-center py-8 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto sm:px-8">
      {/* Top controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="text-sm text-gray-600">Showing all {filteredProducts.length} results</div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Views:</span>
            {viewOptions.map((opt) => (
              <button
                key={opt.value}
                className={`border rounded p-1 bg-white ${view === opt.value ? 'border-blue-500' : ''}`}
                onClick={() => setView(opt.value)}
                aria-label={opt.label}
              >
                {opt.value === 'grid' ? (
                  <svg width="18" height="18" fill="none"><rect width="6" height="6" x="1" y="1" fill="#23263B" /><rect width="6" height="6" x="11" y="1" fill="#23263B" /><rect width="6" height="6" x="1" y="11" fill="#23263B" /><rect width="6" height="6" x="11" y="11" fill="#23263B" /></svg>
                ) : (
                  <svg width="18" height="18" fill="none"><rect width="16" height="3" x="1" y="3" fill="#23263B" /><rect width="16" height="3" x="1" y="8" fill="#23263B" /><rect width="16" height="3" x="1" y="13" fill="#23263B" /></svg>
                )}
              </button>
            ))}
          </div>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {/* Filter button is not needed for instant filtering, but you can keep it for UI consistency */}
        </div>
      </div>
      {/* Products grid/list */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {filteredProducts.map((product, idx) => (
            <Link to={`/products/${product.id}`} key={idx}>
              <div className="flex flex-col items-center bg-white rounded shadow-sm p-2 relative">
                <div className="relative w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[280px] object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://placehold.co/600x400';
                    }}
                  />
                  <button
                    onClick={(e) => handleWishlistClick(e, product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
                    disabled={wishlistMutation.isPending}
                    title={!isAuthenticated() ? 'Login to add to wishlist' : (wishlistItems.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist')}
                  >
                    {wishlistMutation.isPending ? (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="animate-spin"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                      </svg>
                    ) : (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={wishlistItems.has(product.id) ? "#ef4444" : "none"}
                        stroke={wishlistItems.has(product.id) ? "#ef4444" : (!isAuthenticated() ? "#9ca3af" : "#6b7280")}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`hover:scale-110 transition-transform ${!isAuthenticated() ? 'opacity-60' : ''}`}
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    )}
                  </button>
                </div>
                <div className="mt-4 font-semibold text-[#23263B] text-base text-center">{product.name}</div>
                <div className="text-xs text-gray-500 text-center">{product.department}</div>
                <div className="mt-2 flex gap-2 items-center justify-center">
                  <span className="text-gray-400 line-through text-sm">{product.price}</span>
                  <span className="text-[#00C9A7] font-bold text-sm">{product.sale}</span>
                </div>
                <div className="mt-2 flex gap-2 justify-center">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color, display: 'inline-block' }}
                    />
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center bg-white rounded shadow-sm p-2">
              <div className="relative w-full sm:w-[160px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full sm:w-[160px] h-[180px] object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x400';
                  }}
                />
                <button
                  onClick={(e) => handleWishlistClick(e, product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow disabled:opacity-50"
                  disabled={wishlistMutation.isPending}
                  title={!isAuthenticated() ? 'Login to add to wishlist' : (wishlistItems.has(product.id) ? 'Remove from wishlist' : 'Add to wishlist')}
                >
                  {wishlistMutation.isPending ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      className="animate-spin"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill={wishlistItems.has(product.id) ? "#ef4444" : "none"}
                      stroke={wishlistItems.has(product.id) ? "#ef4444" : (!isAuthenticated() ? "#9ca3af" : "#6b7280")}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`hover:scale-110 transition-transform ${!isAuthenticated() ? 'opacity-60' : ''}`}
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  )}
                </button>
              </div>
              <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 flex flex-col items-center sm:items-start">
                <div className="font-semibold text-[#23263B] text-base">{product.name}</div>
                <div className="text-xs text-gray-500">{product.department}</div>
                <div className="mt-2 flex gap-2 items-center">
                  <span className="text-gray-400 line-through text-sm">{product.price}</span>
                  <span className="text-[#00C9A7] font-bold text-sm">{product.sale}</span>
                </div>
                <div className="mt-2 flex gap-2">
                  {product.colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: color, display: 'inline-block' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2">
        <button className="border px-3 py-1 rounded text-gray-500 bg-white">First</button>
        <button className="border px-3 py-1 rounded text-gray-500 bg-white">1</button>
        <button className="border px-3 py-1 rounded text-white bg-blue-500">2</button>
        <button className="border px-3 py-1 rounded text-gray-500 bg-white">Next</button>
      </div>
    </div>
  );
};

export default AllProductsCards;