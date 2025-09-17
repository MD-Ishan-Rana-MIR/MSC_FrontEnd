import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  useGetAlllBrandQuery,
} from "@/redux/admin/brand/brandApi";
import { uploadImg } from "@/img-upload/UploadImage";
import toast, { Toaster } from "react-hot-toast";
import { useGetAllCategoriesQuery } from "@/redux/admin/category/categoryApi";
import { useAddProductMutation } from "@/redux/admin/product/productApi";

const ProductUpload = () => {
  const navigate = useNavigate();

  const { data: categories } =useGetAllCategoriesQuery();
  const { data: brands } = useGetAlllBrandQuery();

  const [createProduct] = useAddProductMutation();

  // Form state
  const [formData, setFormData] = useState({
    category_id: "",
    brand_id: "",
    product_name: "",
    product_type: "",
    price: "",
    discount_price: "",
    product_color: [],
    size: [],
    grunte: "",
    in_stock: false,
    product_des: "",
  });

  const [previewImgs, setPreviewImgs] = useState({
    product_image_1: null,
    product_image_2: null,
    product_image_3: null,
    product_image_4: null,
  });

  // Handle text/number/select inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle image file changes
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImgs({
        ...previewImgs,
        [fieldName]: URL.createObjectURL(file),
      });
      setFormData({
        ...formData,
        [fieldName]: file,
      });
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = { ...formData };

    // Upload images
    for (const key of Object.keys(previewImgs)) {
      if (formData[key]) {
        payload[key] = await uploadImg(formData[key]);
      }
    }

    try {
      await createProduct(payload).unwrap();
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      toast.error("Failed to create product!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-xl p-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select category</option>
            {categories?.data?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label className="block mb-2 font-medium">Brand</label>
          <select
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Select brand</option>
            {brands?.data?.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.brand_name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block mb-2 font-medium">Product Type</label>
          <input
            type="text"
            name="product_type"
            value={formData.product_type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Discount Price</label>
            <input
              type="number"
              name="discount_price"
              value={formData.discount_price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        {/* Images */}
        {["product_image_1", "product_image_2", "product_image_3", "product_image_4"].map(
          (field, i) => (
            <div key={field}>
              <label className="block mb-2 font-medium">Image {i + 1}</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, field)}
                className="w-full border rounded p-2"
                required
              />
              {previewImgs[field] && (
                <img
                  src={previewImgs[field]}
                  alt={`Preview ${i + 1}`}
                  className="mt-2 h-20 w-20 object-cover rounded"
                />
              )}
            </div>
          )
        )}

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="product_des"
            value={formData.product_des}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* In Stock */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="in_stock"
            checked={formData.in_stock}
            onChange={handleChange}
          />
          <span>In Stock</span>
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600"
          >
            Create Product
          </button>
        </div>
      </form>

      <Toaster position="top-center" />
    </div>
  );
};

export default ProductUpload;
