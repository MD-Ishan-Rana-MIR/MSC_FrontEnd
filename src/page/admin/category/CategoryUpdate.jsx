import { useSingleCategoryQuery, useUpdateCategoryMutation } from '@/redux/admin/category/categoryApi';
import { uploadImg } from '@/img-upload/UploadImage';
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateAlert } from '@/helper/updateAlert';

const CategoryUpdate = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleCategoryQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_name: "",
    image: "",   // will hold either server image or local preview
    file: null,  // raw file for upload
  });

  // Prefill formData once data is fetched
  useEffect(() => {
    if (data?.data) {
      setFormData({
        category_name: data.data.category_name || "",
        image: data.data.image || "",
        file: null,
      });
    }
  }, [data]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file), // preview
        file, // keep actual file for upload
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedImg = formData.image;

    // If a new file was selected → upload it
    if (formData.file) {
      updatedImg = await uploadImg(formData.file);
    }

    const payload = {
      category_name: formData.category_name,
      image: updatedImg,
    };

    const resp = await updateAlert(payload);
    if (resp.isConfirmed) {
      try {
        await updateCategory({ id, ...payload }).unwrap();
        toast.success("Category updated successfully!");
        navigate("/dashboard/all-category");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update category!");
      }
    }
  };

  return (
    <>
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg animate-zoom-in">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Category
          </h2>
          <form onSubmit={handleUpdate}>
            {/* Name Field */}
            <div className="mb-4 animate-fade-in-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Category Name
              </label>
              <input
                type="text"
                id="name"
                name="category_name"
                value={formData.category_name}
                onChange={(e) =>
                  setFormData({ ...formData, category_name: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>

            {/* Image Preview */}
            <div className="avatar mb-4 flex justify-center">
              <div className="w-24 h-24 rounded-full border">
                {formData.image && (
                  <img
                    className="rounded-full object-cover w-full h-full"
                    src={formData.image}
                    alt="category"
                  />
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4 animate-fade-in-right">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="img"
              >
                Upload New Image
              </label>
              <input
                type="file"
                id="img"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
              >
                Update Category
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default CategoryUpdate;
