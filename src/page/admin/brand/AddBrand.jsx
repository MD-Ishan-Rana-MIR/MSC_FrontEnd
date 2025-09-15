import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uploadImg } from "@/img-upload/UploadImage";
import { createAlert } from "@/helper/createAlert";
import { useAddBrandMutation } from "@/redux/admin/brand/brandApi";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [imageUrl, setImageUrl] = useState(null); // For preview
  const [imageFile, setImageFile] = useState(null); // For uploading
  const [formData, setFormData] = useState({ brand_name: "", image: "" });
  const [loading, setLoading] = useState(false);

  const [addBrand] = useAddBrandMutation();
  const navigate = useNavigate();

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resp = await createAlert();
    if (!resp.isConfirmed) return;

    try {
      setLoading(true);

      let imgUrl = "";
      if (imageFile) {
        imgUrl = await uploadImg(imageFile);
      }

      const payload = {
        ...formData,
        image: imgUrl,
      };

      let res = await addBrand(payload).unwrap();
      setLoading(false);

      if (res) {
        toast.success("Brand created successfully!");

        // Reset form
        setFormData({ brand_name: "", image: "" });
        setImageUrl(null);
        setImageFile(null);
        e.target.reset();
      }
    } catch (error) {
      setLoading(false);

      if(error.data?.message == "Token expired"){
        navigate("/admin-login")
      }
      toast.error(error.data?.message)
      
      
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Brand</h2>
        <form onSubmit={handleSubmit}>
          {/* Brand Name */}
          <div className=" space-y-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-gray-700 font-bold mb-2"
              >
                Brand Name
              </label>
              <input
                type="text"
                id="name"
                name="brand_name"
                value={formData.brand_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label
                htmlFor="img"
                className="text-gray-700 font-bold mb-2"
              >
                Image
              </label>
              <input
                type="file"
                id="img"
                name="image"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imageUrl && (
            <div className="mb-4">
              <span className="text-gray-700">Selected Image:</span>
              <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-2 max-w-full h-40 object-contain rounded-md border"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className={` bg-blue-500 cursor-pointer text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Brand"}
            </button>
          </div>
        </form>
      </div>

      {/* Loader */}
      

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AddBrand;
