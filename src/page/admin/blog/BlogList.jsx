import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useAllBlogQuery, useBlogDeleteMutation } from "@/redux/admin/blog/blogApi";
import { deleteAlert } from "@/helper/deleteAlert";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const BlogList = () => {

  const { data: blogData } = useAllBlogQuery();

  const blogList = blogData?.data || [];

  console.log(blogList)


  // blog delete 


  const [blogDelete,] = useBlogDeleteMutation()

  const handleBlogDelete = async (id) => {

    try {
      const res = await deleteAlert();
      if (res?.isConfirmed) {
        const res = await blogDelete(id).unwrap();
        if (res) {
          console.log(res?.msg)
          toast.success(res?.msg)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error(error?.msg)
    }

  }




  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              {/* <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th> */}
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogList?.map((item, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition duration-200"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 rounded-xl object-cover shadow-md"
                  />
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">{item.title.slice(0, 10)}...</td>
                <td className="px-6 py-4 text-gray-600">{item.description.slice(0, 20)}...</td>
                <td className="px-6 py-4 text-gray-500">{item.user?.full_name}</td>
                {/* <td className="px-6 py-4 text-black">{item?.isPublish  ? "Publish" : "Not publish"}</td> */}
                <td className="px-6 py-4 flex justify-center gap-4">

                  <Link to={`/dashboard/blog-update/${item?._id}`} >
                    <button

                      className=" cursor-pointer p-2 rounded-xl bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    >
                      <Pencil size={18} />
                    </button></Link>

                  <button
                    onClick={() => { handleBlogDelete(item?._id) }}
                    className=" cursor-pointer p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default BlogList;

