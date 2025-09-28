import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-teal-500 cursor-pointer text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-300 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
