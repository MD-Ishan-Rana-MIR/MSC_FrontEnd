import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useUserRegistrationMutation } from "@/router/auth-api/authApi";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const [userRegistration, { isLoading }] = useUserRegistrationMutation()
    const { full_name, email, password, confirm_password } = formData;
    const payload = {
        full_name,
        email, password, confirm_password
    }
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!password) {
            return toast.error("Enter your password");
        } else if (!confirm_password) {
            return toast.error("Enter your confirm password");
        } else if (password !== confirm_password) {
            return toast.error("Your password and confirm password do not match.");
        }
        try {
            const res = await userRegistration(payload).unwrap();
            if (res) {
                navigate("/auth")
                toast.success(res?.message)
                setFormData({
                    full_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                });

            }
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.msg)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
            >
                <h2 className="text-3xl font-bold text-center text-black mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Full Name */}
                    <div>
                        <label className="block text-black text-sm mb-1">Full Name</label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Hasan Ahmed"
                            className="w-full px-4 py-2 rounded-lg border border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-black text-sm mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="hasan@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-black text-sm mb-1">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full px-4 py-2 rounded-lg border border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </span>
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <label className="block text-black text-sm mb-1">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="********"
                            className="w-full px-4 py-2 rounded-lg border border-black text-black placeholder-gray-500 focus:ring-2 focus:ring-purple-500 outline-none transition"
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-9 cursor-pointer text-gray-600"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </span>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="w-full py-3 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition flex justify-center items-center"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                ></path>
                            </svg>
                        ) : (
                            "Register"
                        )}
                    </motion.button>
                </form>

                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account?{" "}
                    <span className="text-purple-600 cursor-pointer hover:underline">
                        <Link to={"/auth"}>
                            Login
                        </Link>
                    </span>
                </p>
            </motion.div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    );
}
