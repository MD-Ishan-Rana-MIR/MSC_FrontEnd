import { uploadImg } from "@/img-upload/UploadImage";
import { useSendEmailApiMutation } from "@/redux/admin/email/emailApi";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SendEmail = () => {
    const [formData, setFormData] = useState({
        product_name: "",
        product_img: "",
        description: "",
        price: "",
        discount_price: "",
        file: null,
    });
    const initialFormData = {
        product_name: "",
        product_img: "",
        description: "",
        price: "",
        discount_price: "",
        file: null,
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                product_img: URL.createObjectURL(file),
                file,
            });
        }
    };


    const [sendEmailApi, { isLoading }] = useSendEmailApiMutation();



    const handleSubmit = async (e) => {
        e.preventDefault();
        let updatedImg = formData.image;

        if (formData.file) {
            updatedImg = await uploadImg(formData.file);
        }

        const payload = {
            product_name: formData.product_name,
            description: formData.description,
            discount_price: formData?.discount_price,
            price: formData?.price,
            product_img: updatedImg,
        };

        try {
            const res = await sendEmailApi(payload).unwrap();

            if (res) {
                console.log(res)
                toast.success(res?.message);
                setFormData(initialFormData); // ✅ reset form

            }

        } catch (error) {
            console.log(error)
            toast.error(error?.data?.message)
        }




    };

    return (
        <div className="max-w-4xl mx-auto  bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Send Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="product_name"
                        value={formData.product_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                        placeholder="Enter product name"
                        required
                    />
                </div>

                {/* Product Description */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                        placeholder="Enter product description"
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                        placeholder="Enter price"
                        required
                    />
                </div>

                {/* Discount Price */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Discount Price
                    </label>
                    <input
                        type="number"
                        name="discount_price"
                        value={formData.discount_price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                        placeholder="Enter discount price"
                    />
                </div>

                {/* Product Image */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-teal-300"
                    />
                    {formData.product_img && (
                        <img
                            src={formData.product_img}
                            alt="Preview"
                            className="mt-4 w-32 h-32 object-cover rounded-lg border"
                        />
                    )}
                </div>

                {/* Submit Button */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        className="bg-teal-500 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
                    >
                        {
                            isLoading ? "Loading..." : "Send Email"
                        }
                    </button>
                </div>
            </form>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
};

export default SendEmail;
