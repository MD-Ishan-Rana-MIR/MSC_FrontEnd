import React from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/website/home/product-card/ProductCard";

const Product = () => {
    const products = [
        {
            image: "/images/home/product/product-1.png",
            productName: "Classic White Shirt",
            categoryName: "Men",
            price: 50,
            discountPrice: 35,
        },
        {
            image: "/images/home/product/product-2.png",
            productName: "Denim Jacket",
            categoryName: "Women",
            price: 80,
            discountPrice: 60,
        },
        {
            image: "/images/home/product/product-3.png",
            productName: "Sports Sneakers",
            categoryName: "Shoes",
            price: 120,
            discountPrice: 90,
        },
        {
            image: "/images/home/product/product-4.png",
            productName: "Leather Handbag",
            categoryName: "Accessories",
            price: 150,
            discountPrice: 110,
        },
        {
            image: "/images/home/product/product-5.png",
            productName: "Casual T-Shirt",
            categoryName: "Men",
            price: 30,
            discountPrice: 20,
        },
        {
            image: "/images/home/product/product-6.png",
            productName: "Summer Dress",
            categoryName: "Women",
            price: 70,
            discountPrice: 50,
        },
        {
            image: "/images/home/product/product-7.png",
            productName: "Running Shoes",
            categoryName: "Shoes",
            price: 100,
            discountPrice: 75,
        },
        {
            image: "/images/home/product/product-8.png",
            productName: "Wool Scarf",
            categoryName: "Accessories",
            price: 40,
            discountPrice: 28,
        },
    ];

    return (
        <div className="my-10 lg:my-20">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center">
                    <p className="text-[#737373] lg:text-xl text-sm font-normal">
                        Featured Products
                    </p>
                    <h3 className="text-[#252B42] font-bold lg:text-2xl text-xl my-2.5">
                        BESTSELLER PRODUCTS
                    </h3>
                    <p>Problems trying to resolve the conflict between</p>
                </div>

                {/* Product Grid */}
                <div className="mt-10 grid lg:gap-x-6 gap-x-4 lg:space-y-0 space-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((item, index) => (
                        <ProductCard key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Product;
