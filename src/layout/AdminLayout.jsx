import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import SideBar from "@/components/admin/SideBar";
import CommonNavbar from "@/components/admin/CommonNavbar";


const AdminLayout = () => {
  const [Open, setOpen] = useState(true);

  const sideBar = [
    {
      id: 1,
      icon: <MdDashboard />,
      text: "Dashboard",
      path: "/dashboard", // main path (optional, if you still want to keep it)
      activePaths: ["/dashboard", "/dashboard/settings", "/dashboard/analytics"], // all paths that should make this item active
      sublink: false,
    }
    ,

    {
      id: 2,
      icon: <MdDashboard />,
      text: "Category",
      path: "/dashboard/admin-list",
      sublink: [
        {
          id: 1,
          text: "Category List",
          path: "/dashboard/category-list",
        },
        {
          id: 2,
          text: "Add Category",
          path: "/dashboard/add-category"
        },
      ]
    },
    {
      id: 3,
      icon: <MdDashboard />,
      text: "Brand",
      path: "/dashboard/admin-list",
      sublink: [
        {
          id: 1,
          text: "Brand List",
          path: "/dashboard/brand-list",
        },
        {
          id: 2,
          text: "Upload Brand",
          path: "/dashboard/add-brand"
        },
      ]
    },
    {
      id: 4,
      icon: <MdDashboard />,
      text: "Product",
      path: "/dashboard/admin-list",
      sublink: [
        {
          id: 1,
          text: "Product List",
          path: "/dashboard/product-list",
        },
        {
          id: 2,
          text: "Upload Product",
          path: "/dashboard/add-product"
        },
      ]
    },
  ];
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <ScrollRestoration />
      <div className="flex  h-screen min-h-screen w-full">
        <div className="w-[320px] border">
          <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        </div>
        <div className="flex-1 bg-dark  flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col lg:gap-10 gap-5 lg:py-6 py-3 lg:px-[30px] px-2.5 sm:px-5">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <div className="">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
};

export default AdminLayout;
