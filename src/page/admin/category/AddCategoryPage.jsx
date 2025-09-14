import { uploadImg } from "@/img-upload/UploadImage";
import { useAddCategoryMutation } from "@/redux/admin/category/categoryApi";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddCategoryPage = () => {
  const categoryRef = useRef();
  const imageRef = useRef();
  const [preview, setPreview] = useState(null); // optional preview
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const [addCategory, { isLoading }] = useAddCategoryMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const category_name = categoryRef.current.value;
    const image = imageRef.current.files[0];

    if (!category_name || !image) {
      alert("Please provide category name and image!");
      return;
    }

    setLoading(true);
    let imgUrl = "";

    try {
      // Upload image using your custom upload function
      imgUrl = await uploadImg(image);
      console.log("Uploaded Image URL:", imgUrl);

      // Send category_name and imgUrl to your backend API
      const payload = {
        category_name,
        image: imgUrl,
      };

      const res = await addCategory(payload).unwrap();
      if (res) {
        console.log(res)
        // Reset form
        e.target.reset();
        setPreview(null);
        toast.success(res?.message)
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error(error?.data?.error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Category
        </h2>

        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="category_name"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            ref={categoryRef}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category Image
          </label>
          <input
            type="file"
            id="image"
            ref={imageRef}
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default AddCategoryPage;
