import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  useSingleBrandQuery,
  useUpdateBrandMutation,
} from "@/redux/admin/brand/brandApi";
import { uploadImg } from "@/img-upload/UploadImage";
import { updateAlert } from "@/helper/updateAlert";

const BrandUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updateBrand] = useUpdateBrandMutation();

  // ✅ local state for live preview
  const [preview, setPreview] = useState(null);

  // ✅ fetch brand data with id
  const { data: brandData, isLoading } = useSingleBrandQuery(id);

  // ✅ safely extract brand fields
  const brand_name = brandData?.data?.brand_name || "";
  const incomingImg = brandData?.data?.image || "";

  // ✅ set default preview only once (when brand data arrives)
  useEffect(() => {
    if (incomingImg && !preview) {
      setPreview(incomingImg);
    }
  }, [incomingImg, preview]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const brand_name = e.target.brand_name.value;
    let imgFile = e.target.image.files[0];

    let updatedImg = incomingImg;
    if (imgFile) {
      updatedImg = await uploadImg(imgFile);
    }

    const payload = { brand_name, image: updatedImg };

    const resp = await updateAlert();
    if (resp.isConfirmed) {
      try {
        let res = await updateBrand({ id, payload }).unwrap();
        if (res) {
          toast.success("Brand updated successfully!");
        //   navigate("/admin/brand");
        }
      } catch (err) {
        toast.error("Failed to update brand!");
      }
    }
  };

  // ✅ handle live preview when user selects/clears a file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(incomingImg); // reset to old image if cleared
    }
  };

  // 🚦 move conditional UI checks here (not before hooks)
  if (isLoading) return <p>Loading...</p>;
  if (!brandData) return <p>No brand found!</p>;

  return (
    <>
      <div>
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg animate-zoom-in">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Brand ({brand_name})
          </h2>

          <form onSubmit={handleUpdate}>
            {/* Name Field */}
            <div className="mb-4 animate-fade-in-left">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="brand_name"
              >
                Name
              </label>
              <input
                type="text"
                id="brand_name"
                name="brand_name"
                placeholder="Enter brand name"
                defaultValue={brand_name}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
            </div>

            {/* Image Preview */}
            <div className="avatar mb-4 flex gap-4 items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden border">
                <img
                  className="object-cover w-full h-full"
                  src={preview}
                  alt="Brand Preview"
                />
              </div>

              {preview !== incomingImg ? (
                <p className="text-xs text-green-600">New image selected ✅</p>
              ) : (
                <p className="text-xs text-gray-500">Showing current image</p>
              )}
            </div>

            {/* Image Field */}
            <div className="mb-4 animate-fade-in-right">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-teal-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Current image will remain if you don’t upload a new one.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-teal-500 cursor-pointer text-white font-bold py-2 px-4 rounded hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default BrandUpdate;
