import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Heart, Search, User, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user-token");
    if (userToken) {
      setToken(userToken); // ✅ set from localStorage
    }
  }, []); // ✅ run only once on mount

  console.log("state token:", token);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-token");
    setToken(null);
    localStorage.removeItem("welcomeModalShown");
    toast.success("Logged out successfully");
  }

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl text-orange-primary">
            <Link to="/">Bandage</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-orange-secondary text-sm font-bold hover:text-orange-primary transition-colors">Home</Link>
            <Link to="/products" className="text-orange-secondary text-sm font-bold hover:text-orange-primary transition-colors">Shop</Link>
            <Link to="/about" className="text-orange-secondary text-sm font-bold hover:text-orange-primary transition-colors">About</Link>
            <Link to="/contact" className="text-orange-secondary text-sm font-bold hover:text-orange-primary transition-colors">Contact</Link>
            <Link to="/new-arrival" className="text-orange-secondary text-sm font-bold hover:text-orange-primary transition-colors">New Arrival</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-700 hover:text-orange-primary transition-colors"
              >
                <Search size={20} className="cursor-pointer" />
              </button>
              {showSearch && (
                <div className="absolute flex gap-x-2 right-0 mt-6 w-64 bg-white shadow p-2 rounded-md z-50">
                  <Input placeholder="Search..." autoFocus />
                  <button className="text-white font-semibold bg-orange-primary hover:bg-orange-dark rounded-xl px-3 py-1 transition-colors">
                    Search
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-orange-primary relative transition-colors">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-orange-primary relative transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </Link>

            {/* Login */}

            <div className="relative" ref={menuRef}>
              {token ? (
                <button
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex cursor-pointer items-center text-red-500 hover:underline transition-colors"
                >
                  <User className="mr-1 cursor-pointer " size={16} /> Account
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center text-orange-primary hover:underline transition-colors"
                >
                  <User className="mr-1" size={16} /> Login
                </Link>
              )}

              {/* Dropdown */}
              {token && open && (
                <div className="absolute z-50 right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>


            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-orange-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pt-4 pb-6 space-y-2">
          <Link to="/" className="block text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors">Home</Link>
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="block w-full text-left text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors"
            >
              Shop
            </button>

          </div>
          <Link to="/about" className="block text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors">About</Link>
          <Link to="/blog" className="block text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors">Blog</Link>
          <Link to="/contact" className="block text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors">Contact</Link>
          <Link to="/pages" className="block text-orange-secondary font-bold py-1 hover:text-orange-primary transition-colors">Pages</Link>
        </div>
      )}
    </nav>
  );
}
