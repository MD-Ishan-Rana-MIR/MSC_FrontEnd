import { uploadImg } from "@/img-upload/UploadImage";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { updateAlert } from "@/helper/updateAlert";
import {
  useBlogUpdateMutation,
  useSingleBlogQuery,
} from "@/redux/admin/blog/blogApi";

const BlogUpdate = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleBlogQuery(id);
  const [blogUpdate] = useBlogUpdateMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    file: null,
  });

  // Prefill formData once data is fetched (array case)
  useEffect(() => {
    if (Array.isArray(data?.data) && data.data.length > 0) {
      const blog = data.data[0];
      setFormData((prev) => ({
        ...prev,
        title: blog?.title ?? prev.title,
        image: blog?.image ?? prev.image,
        description: blog?.description ?? prev.description,
        file: null,
      }));
    }
  }, [data]);

  if (isLoading) return <p className="text-center">Loading...</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    let updatedImg = formData.image;

    if (formData.file) {
      updatedImg = await uploadImg(formData.file);
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      image: updatedImg,
    };

    const resp = await updateAlert(payload);
    if (resp.isConfirmed) {
      try {
        await blogUpdate({ id, payload}).unwrap();
        toast.success("Blog updated successfully!");
        navigate("/dashboard/blog-list");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to update blog!");
      }
    }
  };

  return (
    <>
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg animate-zoom-in">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Blog
          </h2>
          <form onSubmit={handleUpdate}>
            {/* Title */}
            <div className="mb-4 animate-fade-in-left">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4 animate-fade-in-left">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
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
                    alt="blog"
                  />
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-4 animate-fade-in-right">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 cursor-pointer text-white font-bold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
              >
                Update Blog
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default BlogUpdate;
