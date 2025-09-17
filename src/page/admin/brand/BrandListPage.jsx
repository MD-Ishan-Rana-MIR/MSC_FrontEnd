import { deleteAlert } from "@/helper/deleteAlert";
import {
  useDeleteBrandMutation,
  useGetAllBrandQuery,
} from "@/redux/admin/brand/brandApi";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function BrandListPage() {
  const { data, isLoading } = useGetAllBrandQuery();

  console.log(`-------data---------`,data)

  const [brands, setBrands] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // update brands when API data changes
  useEffect(() => {
    if (data?.data) {
      setBrands(data.data);
    }
  }, [data]);

  const navigate = useNavigate();

  const [deleteBrand] = useDeleteBrandMutation()

  const handleDelete = async (id) => {
    try {
      const res = await deleteAlert();
      if (res.isConfirmed) {
        const deleted = await deleteBrand(id).unwrap();
        if (deleted) {
          toast.success(deleted.msg || "Brand deleted successfully");
        }
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to delete brand");
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading brands...</p>
      </div>
    );
  }

  // pagination calculations
  const totalPages = Math.ceil(brands.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBrands = brands.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Brands</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                Brand Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                Upload Date
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentBrands.map((brand) => (
              <tr key={brand._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {brand.brand_name}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={brand.image}
                    alt={brand.brand_name}
                    className="h-12 w-12 object-cover rounded-lg border"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(brand.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <Link to={`/dashboard/brand-update/${brand?._id}`}>
                    <button className="px-4 cursor-pointer py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow">
                      <Edit />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(brand._id)}
                    className="px-4 cursor-pointer py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {brands.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No brands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {brands.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-3 py-1 rounded-md border text-sm ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
