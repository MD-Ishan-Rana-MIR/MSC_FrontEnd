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

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo */}
          <div className="flex-shrink-0 font-bold text-xl text-blue-900">
            <Link to="/">Bandage</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-[#737373] text-sm font-bold">Home</Link>

            {/* Shop Dropdown */}
            <DropdownMenu open={shopOpen} onOpenChange={setShopOpen}>
              <DropdownMenuTrigger
                asChild
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="text-[#737373] text-sm font-bold">Shop</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
                className="w-48"
              >
                <DropdownMenuItem><Link to="/shop/product1">Shop 1</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/shop/product2">Shop 2</Link></DropdownMenuItem>
                <DropdownMenuItem><Link to="/shop/product3">Shop 3</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="text-[#737373] text-sm font-bold">About</Link>
            <Link to="/blog" className="text-[#737373] text-sm font-bold">Blog</Link>
            <Link to="/contact" className="text-[#737373] text-sm font-bold">Contact</Link>
            <Link to="/pages" className="text-[#737373] text-sm font-bold">Pages</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="text-gray-700 hover:text-blue-600"
              >
                <Search size={20} className="cursor-pointer" />
              </button>
              {showSearch && (
                <div className="absolute flex gap-x-2 right-0 mt-6 w-64 bg-white shadow p-2 rounded-md z-50">
                  <Input placeholder="Search..." autoFocus />
                  <button className="text-white font-semibold bg-[#2DC071] rounded-xl px-3 py-1">
                    Search
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="text-gray-700 hover:text-blue-600 relative">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">1</span>
            </Link>

            {/* Login */}
            <Link to="/login" className="flex items-center text-blue-600 hover:underline">
              <User className="mr-1" size={16} /> Login
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-700 hover:text-blue-600"
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
          <Link to="/" className="block text-gray-700 font-bold py-1">Home</Link>
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="block w-full text-left text-gray-700 font-bold py-1"
            >
              Shop
            </button>
            {shopOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <Link to="/shop/product1" className="block text-gray-600 py-1">Shop 1</Link>
                <Link to="/shop/product2" className="block text-gray-600 py-1">Shop 2</Link>
                <Link to="/shop/product3" className="block text-gray-600 py-1">Shop 3</Link>
              </div>
            )}
          </div>
          <Link to="/about" className="block text-gray-700 font-bold py-1">About</Link>
          <Link to="/blog" className="block text-gray-700 font-bold py-1">Blog</Link>
          <Link to="/contact" className="block text-gray-700 font-bold py-1">Contact</Link>
          <Link to="/pages" className="block text-gray-700 font-bold py-1">Pages</Link>
        </div>
      )}
    </nav>
  );
}
