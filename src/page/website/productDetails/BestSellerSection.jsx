import React from 'react';

const BestsellerProducts = () => {
    const products = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop",
            title: "Luxury Chronograph Watch",
            department: "Men's Watches",
            originalPrice: "$299.99",
            salePrice: "$199.99"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=300&h=300&fit=crop",
            title: "Classic Leather Handbag",
            department: "Women's Accessories",
            originalPrice: "$189.99",
            salePrice: "$129.99"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&h=300&fit=crop",
            title: "Designer Sunglasses",
            department: "Accessories",
            originalPrice: "$159.00",
            salePrice: "$99.00"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1594576722512-582bcd46fba3?w=300&h=300&fit=crop",
            title: "Premium Running Shoes",
            department: "Footwear",
            originalPrice: "$149.99",
            salePrice: "$89.99"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop",
            title: "Minimalist Silver Watch",
            department: "Women's Watches",
            originalPrice: "$179.99",
            salePrice: "$119.99"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=300&fit=crop",
            title: "Casual Denim Jacket",
            department: "Men's Clothing",
            originalPrice: "$89.99",
            salePrice: "$59.99"
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop",
            title: "Elegant Pearl Necklace",
            department: "Jewelry",
            originalPrice: "$249.99",
            salePrice: "$179.99"
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop",
            title: "Sport Smartwatch",
            department: "Electronics",
            originalPrice: "$199.99",
            salePrice: "$149.99"
        }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
                    BESTSELLER PRODUCTS
                </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="group cursor-pointer">
                        {/* Product Image */}
                        <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {product.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {product.department}
                            </p>

                            {/* Pricing */}
                            <div className="flex justify-center items-center space-x-2">
                                <span className="text-gray-400 line-through text-sm">
                                    {product.originalPrice}
                                </span>
                                <span className="text-green-600 font-semibold">
                                    {product.salePrice}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BestsellerProducts;