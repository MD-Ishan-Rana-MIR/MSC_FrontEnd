import React, { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import SideBar from "@/components/admin/SideBar";
import CommonNavbar from "@/components/admin/CommonNavbar";


const AdminLayout = () => {
  const [Open, setOpen] = useState(false);

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
      text: "Poduct Management",
      path: "/dashboard/category",
      sublink: [
        {
          id: 1,
          text: "Product List",
          path: "/dashboard/admin-list",
        },
        {
          id: 2,
          text: "Add New Product",
          path: "/dashboard/asdasd"
        },
      ]
    },
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
          path: "/dashboard/category"
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
        <SideBar open={Open} setOpen={setOpen} sidebar={sideBar} />
        <div className="flex-1 bg-dark text-white flex flex-col overflow-auto custom-scrollbar">
          <div className=" flex flex-col lg:gap-10 gap-5 lg:py-6 py-3 lg:px-[30px] px-2.5 sm:px-5">
            <CommonNavbar open={Open} setOpen={setOpen} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
