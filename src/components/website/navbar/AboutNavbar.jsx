import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for mobile toggle

const AboutNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full border-b border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 lg:px-0 py-4">
                {/* Logo */}
                <Link
                    className="text-orange-primary font-bold lg:text-2xl text-xl"
                    to={"/"}
                >
                    Bandage
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex">
                    <ul className="flex flex-row items-center justify-between text-orange-light font-bold gap-x-6">
                        <li>
                            <Link to={"/"} className="hover:text-orange-primary transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link to={"/product"} className="hover:text-orange-primary transition-colors">Product</Link>
                        </li>
                        <li>
                            <Link to={"/price"} className="hover:text-orange-primary transition-colors">Pricing</Link>
                        </li>
                        <li>
                            <Link to={"/contact"} className="hover:text-orange-primary transition-colors">Contact</Link>
                        </li>
                    </ul>
                </nav>

                {/* Buttons */}
                <div className="hidden md:flex items-center gap-x-4 lg:gap-x-9">
                    <Link
                        className="text-orange-primary text-sm font-bold hover:text-orange-dark transition-colors"
                        to={"/login"}
                    >
                        Login
                    </Link>
                    <Link
                        className="px-4 py-2 lg:px-6 rounded-[5px] lg:py-3.5 text-sm font-bold text-white bg-orange-primary hover:bg-orange-dark gap-x-2 flex items-center transition-colors"
                        to={"/become-member"}
                    >
                        Become a member
                        <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 5C0 4.81059 0.079009 4.62895 0.219646 4.49502C0.360282 4.36108 0.551026 4.28584 0.749916 4.28584H9.43845L6.21831 1.22068C6.07749 1.08658 5.99838 0.904705 5.99838 0.715059C5.99838 0.525414 6.07749 0.343536 6.21831 0.209436C6.35912 0.0753365 6.5501 0 6.74925 0C6.94839 0 7.13937 0.0753365 7.28019 0.209436L11.7797 4.49438C11.8495 4.56072 11.9049 4.63952 11.9427 4.72629C11.9805 4.81305 12 4.90606 12 5C12 5.09394 11.9805 5.18695 11.9427 5.27371C11.9049 5.36048 11.8495 5.43928 11.7797 5.50562L7.28019 9.79056C7.13937 9.92466 6.94839 10 6.74925 10C6.5501 10 6.35912 9.92466 6.21831 9.79056C6.07749 9.65646 5.99838 9.47459 5.99838 9.28494C5.99838 9.0953 6.07749 8.91342 6.21831 8.77932L9.43845 5.71416H0.749916C0.551026 5.71416 0.360282 5.63892 0.219646 5.50499C0.079009 5.37106 0 5.18941 0 5Z"
                                fill="white"
                            />
                        </svg>
                    </Link>
                </div>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700 hover:text-orange-primary cursor-pointer transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col gap-y-3 text-orange-light font-bold">
                        <li>
                            <Link to={"/"} onClick={() => setIsOpen(false)} className="hover:text-orange-primary transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link to={"/product"} onClick={() => setIsOpen(false)} className="hover:text-orange-primary transition-colors">Product</Link>
                        </li>
                        <li>
                            <Link to={"/price"} onClick={() => setIsOpen(false)} className="hover:text-orange-primary transition-colors">Pricing</Link>
                        </li>
                        <li>
                            <Link to={"/contact"} onClick={() => setIsOpen(false)} className="hover:text-orange-primary transition-colors">Contact</Link>
                        </li>
                        <li>
                            <Link
                                className="text-orange-primary text-sm font-bold hover:text-orange-dark transition-colors"
                                to={"/login"}
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="px-4 py-2 rounded-[5px] text-sm font-bold text-white bg-orange-primary hover:bg-orange-dark flex items-center gap-x-2 transition-colors"
                                to={"/become-member"}
                                onClick={() => setIsOpen(false)}
                            >
                                Become a member
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

export default AboutNavbar;
