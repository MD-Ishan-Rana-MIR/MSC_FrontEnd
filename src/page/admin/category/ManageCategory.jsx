import { deleteAlert } from "@/helper/deleteAlert";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/admin/category/categoryApi";
import { Edit } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function ManageCategory() {
  const { data, isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();
  const [categories, setCategories] = useState([]);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // ✅ change this for more/less rows per page

  // update categories when API data changes
  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
    }
  }, [data]);

  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update-category/${id}`)
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteAlert();
      if (res.isConfirmed) {
        const res = await deleteCategory(id).unwrap();
        if (res) {
          console.log(res?.msg)
          toast.success(res.msg)
        }
      }

    } catch (error) {
      toast.error(error?.data.msg)
      console.log(error)
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading categories...</p>
      </div>
    );
  }

  // pagination calculations
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold border-b">
                Category Name
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
            {currentCategories.map((cat) => (
              <tr key={cat._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-gray-800">
                  {cat.category_name}
                </td>
                <td className="px-6 py-4">
                  <img
                    src={cat.image}
                    alt={cat.category_name}
                    className="h-12 w-12 object-cover rounded-lg border"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <Link to={`/dashboard/category-update/${cat?._id}`}>
                  <button
                    
                    className="px-4 cursor-pointer py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow"
                  >
                    <Edit />
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-4 py-2 cursor-pointer text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      {categories.length > itemsPerPage && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-3 py-1 rounded-md border text-sm ${currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
          >
            Prev
          </button>

          {/* page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm ${currentPage === i + 1
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
            className={`px-3 py-1 rounded-md border text-sm ${currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 text-gray-700"
              }`}
          >
            Next
          </button>
        </div>
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
}
