import { deleteAlert } from "@/helper/deleteAlert";
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/admin/product/productApi";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProductList() {
  const { data, isLoading } = useGetAllProductsQuery();
  const products = data?.data || [];

  const [rows, setRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ✅ Sync rows with API data
  useEffect(() => {
    if (products.length) {
      setRows(products);
    }
  }, [products]);



  // Pagination logic
  const totalPages = Math.ceil(rows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = rows.slice(startIndex, startIndex + itemsPerPage);



  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

    const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (id)=>{
    try {

      const res = await deleteAlert();

      if(res?.isConfirmed){
        const res = await deleteProduct(id).unwrap();
        if(res){
          toast.success(res?.msg)
        }
      }
      
    } catch (error) {
      console.log(error?.msg)
    }



  }

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }



  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white shadow-sm rounded-2xl border border-gray-100 overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Category Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Brand Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Discount Price</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-500">
                  No products to show.
                </td>
              </tr>
            ) : (
              currentItems.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row?.category?.category_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {row?.brand?.brand_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    ${row.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    ${row.discount_price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDeleteProduct(row._id)}
                      className="inline-flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-100 hover:bg-red-100"
                      aria-label={`Delete ${row.brand?.brand_name} ${row.category?.category_name}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-500">
          Showing {currentItems.length} of {rows.length} item{rows.length !== 1 ? "s" : ""}.
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-600 disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 text-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
