import React from 'react';

const BestsellerProducts = () => {
    const products = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&h=300&fit=crop",
            title: "Graphic Design",
            department: "English Department",
            originalPrice: "$16.48",
            salePrice: "$6.48"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
            title: "Creative Writing",
            department: "English Department",
            originalPrice: "$18.99",
            salePrice: "$8.99"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=300&fit=crop",
            title: "Photography",
            department: "Arts Department",
            originalPrice: "$20.00",
            salePrice: "$10.00"
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=300&h=300&fit=crop",
            title: "Music Production",
            department: "Music Department",
            originalPrice: "$22.50",
            salePrice: "$12.50"
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=300&fit=crop",
            title: "Web Development",
            department: "Computer Science",
            originalPrice: "$25.00",
            salePrice: "$15.00"
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
            title: "UI/UX Design",
            department: "Design Department",
            originalPrice: "$30.00",
            salePrice: "$18.00"
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
            title: "Digital Marketing",
            department: "Business Department",
            originalPrice: "$19.99",
            salePrice: "$9.99"
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=300&h=300&fit=crop",
            title: "Cooking Basics",
            department: "Culinary Department",
            originalPrice: "$14.50",
            salePrice: "$7.50"
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