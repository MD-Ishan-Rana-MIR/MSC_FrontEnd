import React, { useState } from 'react';

const productsData = [
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
  {
    name: 'Graphic Design',
    department: 'English Department',
    price: '$16.48',
    sale: '$6.48',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    colors: ['#00C9A7', '#FFB800', '#FF6B6B', '#3D8BFF'],
  },
];

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'English Department', value: 'English Department' },
  // Add more departments if needed
];

const viewOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
];

const AllProductsCards = () => {
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('grid');

  const filteredProducts =
    filter === 'all'
      ? productsData
      : productsData.filter((p) => p.department === filter);

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
            <div key={idx} className="flex flex-col items-center bg-white rounded shadow-sm p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[280px] object-cover rounded"
              />
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
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mb-8">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-center bg-white rounded shadow-sm p-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full sm:w-[160px] h-[180px] object-cover rounded"
              />
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