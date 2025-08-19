import React from 'react';

const ShopSummary = () => {
  const categories = [
    {
      title: 'CLOTHS',
      items: 5,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    },
    {
      title: 'CLOTHS',
      items: 5,
      image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
    },
    {
      title: 'CLOTHS',
      items: 5,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
    {
      title: 'CLOTHS',
      items: 5,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    },
    {
      title: 'CLOTHS',
      items: 5,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
    },
  ];


  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-[#23263B] text-3xl">Shop</h1>
          <nav className="font-medium text-[#23263B] flex items-center">
            <span className="font-bold text-[#23263B]">Home</span>
            <span className="mx-2">{'>'}</span>
            <span className="text-[#A0A3BD]">Shop</span>
          </nav>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="relative  h-[300px] rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center font-bold text-xl tracking-wide">
                <div>{cat.title}</div>
                <div className="font-normal text-lg mt-2">
                  {cat.items} Items
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSummary;