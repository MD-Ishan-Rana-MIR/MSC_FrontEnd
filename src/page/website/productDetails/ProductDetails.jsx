import React, { useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useUserProfileQuery } from "@/redux/auth-api/authApi";
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiCpu, FiSmartphone } from "react-icons/fi"
import { IoMdCamera } from "react-icons/io"
import { MdBatteryChargingFull } from "react-icons/md"
import { GoVerified } from "react-icons/go";
import { IoStorefrontOutline } from "react-icons/io5";
import { CiDeliveryTruck } from "react-icons/ci";

const ProductDetails = ({ productDetails }) => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [selectedColor, setSelectedColor] = useState("")
    const [selectedStorage, setSelectedStorage] = useState("M")
    const [quantity, setQuantity] = useState(1)
    const [isFavorite, setIsFavorite] = useState(false)

    const axiosSecure = useAxiosSecure();
    const { data: userProfile } = useUserProfileQuery();

    if (!productDetails) {
        return <div>Loading...</div>;
    }

    // Get all product images from the product data
    const productImages = [
        productDetails.product_image_1,
        productDetails.product_image_2,
        productDetails.product_image_3,
        productDetails.product_image_4
    ].filter(Boolean); // Remove any null/undefined images

    // Set default selected color to first available color
    if (!selectedColor && productDetails.product_color?.length > 0) {
        setSelectedColor(productDetails.product_color[0].name);
    }

    const handleAddToCart = async () => {
        try {
            const userId = userProfile?.data?._id || userProfile?.data?.id;
            if (!userId) {
                alert("Please login to add items to cart.");
                return;
            }
            const productId = productDetails?._id;
            if (!productId) {
                alert("Product information not available.");
                return;
            }
            const payload = {
                userId,
                productId,
                quentity: Number(quantity) || 1,
                size: selectedStorage,
                color: selectedColor || (productDetails?.product_color?.[0]?.name || "")
            };

            const res = await axiosSecure.post("/add-to-cart", payload);
            if (res?.data) {
                alert("Added to cart successfully.");
            }
        } catch (error) {
            console.error("Add to cart failed", error);
            alert(error?.response?.data?.message || "Failed to add to cart.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto md:px-8 md:py-12">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Left side - Image gallery */}
                <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">

                    {/* Thumbnails */}
                    <div className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">
                        {productImages.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-[#0FABCA]" : "border-transparent dark:border-slate-700"
                                    }`}
                            >
                                <img
                                    src={image}
                                    alt={`${productDetails.product_name} ${index + 1}`}
                                    className="object-cover w-full h-full"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="w-full md:w-[80%] dark:bg-slate-900 bg-gray-100 rounded-sm h-[280px] md:h-[400px] relative flex items-center justify-center">
                        <img
                            src={productImages[selectedImage]}
                            alt={productDetails.product_name}
                            className="object-cover w-[200px] md:w-[300px] rounded-lg hover:scale-105 transition"
                        />
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.9rem] font-bold text-gray-800">
                            {productDetails.product_name}
                        </h1>
                        <div className="flex items-center gap-2 mt-2 md:mt-5">
                            <span className="text-3xl dark:text-[#abc2d3] font-medium">
                                ${productDetails.discount_price || productDetails.price}
                            </span>
                            {productDetails.discount_price && productDetails.discount_price < productDetails.price && (
                                <span className="text-xl dark:text-slate-400 text-gray-500 line-through">
                                    ${productDetails.price}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Color selection */}
                    {productDetails.product_color && productDetails.product_color.length > 0 && (
                        <div className="flex float-start md:items-center flex-col md:flex-row gap-[10px]">
                            <label className="text-sm dark:text-[#abc2d3] font-medium">Select color:</label>
                            <div className="flex gap-3">
                                {productDetails.product_color.map((color) => (
                                    <button
                                        key={color._id}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-8 h-8 rounded-full ${selectedColor === color.name ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]" : ""
                                            }`}
                                        style={{ backgroundColor: color.code }}
                                        aria-label={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size/Storage selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm dark:text-[#abc2d3] font-medium">Select size:</label>
                        <div className="flex gap-2">
                            {['S', 'M', 'L', 'XL'].map((sz) => (
                                <button
                                    key={sz}
                                    onClick={() => setSelectedStorage(sz)}
                                    className={`px-3 py-1 rounded border ${selectedStorage === sz ? 'bg-[#0FABCA] text-white border-[#0FABCA]' : 'dark:border-slate-700 border-gray-200'}`}
                                >
                                    {sz}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                        <label className="text-sm dark:text-[#abc2d3] font-medium">Quantity:</label>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-1 border rounded dark:border-slate-700 border-gray-200">-</button>
                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                                className="w-16 text-center border rounded dark:border-slate-700 border-gray-200 py-1"
                            />
                            <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-1 border rounded dark:border-slate-700 border-gray-200">+</button>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
                            <FiSmartphone className="w-5 h-5 dark:text-[#abc2d3] text-gray-700" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Screen size</p>
                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">
                                    {productDetails.size || "N/A"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
                            <FiCpu className="w-5 h-5 dark:text-[#abc2d3] text-gray-700" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Product Type</p>
                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">
                                    {productDetails.product_type}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
                            <IoStorefrontOutline className="w-5 h-5 dark:text-[#abc2d3] text-gray-700" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Category</p>
                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">
                                    {productDetails.category_id}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
                            <GoVerified className="w-5 h-5 dark:text-[#abc2d3] text-gray-700" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Brand</p>
                                <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">
                                    {productDetails.brand_id}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Product description placeholder */}
                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">
                        Discover the amazing features of the {productDetails.product_name}.
                        This {productDetails.product_type.toLowerCase()} offers exceptional performance and quality...
                        <button className="text-[#3B9DF8] hover:underline">more...</button>
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="flex-1 py-3 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50">
                            <div className="flex items-center justify-center gap-2">
                                {isFavorite ? (
                                    <BsHeartFill className="w-5 h-5 text-red-500" />
                                ) : (
                                    <BsHeart className="w-5 h-5" />
                                )}
                                Add to Wishlist
                            </div>
                        </button>
                        <button onClick={handleAddToCart} className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90">
                            Add to Cart
                        </button>
                    </div>

                    {/* Delivery info */}
                    <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">
                        <div className="flex items-center gap-3">
                            <CiDeliveryTruck className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Free Delivery</p>
                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">1-2 days</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <IoStorefrontOutline className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">In Stock</p>
                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">Today</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <GoVerified className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md" />
                            <div>
                                <p className="text-sm dark:text-[#abc2d3] text-gray-500">Guaranteed</p>
                                <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">1 year</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;  