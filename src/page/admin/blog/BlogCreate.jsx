import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { uploadImg } from "@/img-upload/UploadImage";
import { useCreateBlogMutation } from "@/redux/admin/blog/blogApi";

export default function BlogCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const inputImageRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (title.length > 120) e.title = "Title must be 120 characters or less.";
    if (!description.trim()) e.description = "Description is required.";
    if (description.length > 1000) e.description = "Description must be 1000 characters or less.";
    if (!imageFile) e.image = "Please upload an image.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleImageChange = (file) => {

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "File must be an image." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target.result);
    reader.readAsDataURL(file);
    setImageFile(file);
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const onFileInputChange = (e) => {
    handleImageChange(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    handleImageChange(file);
  };

  const [createBlog] = useCreateBlogMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (imageFile) {
      imgUrl = await uploadImg(imageFile);
    }
    if (!validate()) return;
    const payload = {
      title,
      description,
      image: imgUrl,
    };
    try {




      const res = await createBlog(payload).unwrap();
      console.log(res)

      // Reset form
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setErrors({});
      if (inputImageRef.current) inputImageRef.current.value = null;

    } catch (error) {
      console.error("❌ Error:", error);
      if(error?.data?.message == "Token expired"){
        localStorage.removeItem("admin_token")
         window.location.href = "/admin-login"
      }
      setErrors({ submit: "Something went wrong. Try again later." });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <motion.h2
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4"
      >
        Create post — title, description & image
      </motion.h2>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
            placeholder="Enter a short, descriptive title"
            className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 ${errors.title ? "border-red-400" : "border-gray-200"}`}
            aria-invalid={errors.title ? "true" : "false"}
            aria-describedby={errors.title ? "title-error" : undefined}
            required
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span id="title-help">Max 120 chars</span>
            <span>{title.length}/120</span>
          </div>
          {errors.title && (
            <p id="title-error" className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            maxLength={1000}
            placeholder="Write a clear description..."
            className={`block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400 ${errors.description ? "border-red-400" : "border-gray-200"}`}
            aria-invalid={errors.description ? "true" : "false"}
            aria-describedby={errors.description ? "description-error" : undefined}
            required
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>Provide useful context for the image</span>
            <span>{description.length}/1000</span>
          </div>
          {errors.description && (
            <p id="description-error" className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            className={`flex items-center justify-center gap-4 p-4 rounded-md border-dashed border-2 ${errors.image ? "border-red-400" : "border-gray-200"}`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") inputImageRef.current?.click();
            }}
          >
            <div className="text-center">
              <p className="text-sm">Drag & drop an image here, or</p>
              <div className="mt-2">
                <label
                  htmlFor="image"
                  className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md text-sm cursor-pointer"
                >
                  Choose image
                </label>
                <input
                  id="image"
                  ref={inputImageRef}
                  onChange={onFileInputChange}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">JPEG, PNG, or GIF — up to 5MB</p>
            </div>
          </div>
          {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}

          {/* Preview */}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview</p>
              <div className="flex items-start gap-4">
                <img
                  src={imagePreview}
                  alt={title ? `${title} preview` : "uploaded preview"}
                  className="w-32 h-32 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <p className="font-semibold">{title || "Untitled"}</p>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-3">
                    {description || "No description"}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        if (inputImageRef.current) inputImageRef.current.value = null;
                      }}
                      className="px-3 py-1 rounded-md border text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">All fields required</div>
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setImageFile(null);
                setImagePreview(null);
                setErrors({});
                if (inputImageRef.current) inputImageRef.current.value = null;
              }}
              className="px-4 py-2 rounded-md border"
            >
              Reset
            </button>
          </div>
        </div>
        {errors.submit && <p className="mt-2 text-sm text-red-600">{errors.submit}</p>}
      </form>

     
    </div>
  );
}
