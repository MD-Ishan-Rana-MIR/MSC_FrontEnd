import { useUserEmailVerifyMutation } from "@/router/auth-api/authApi";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EmailVerify() {
    const [email, setEmail] = useState("");
    const [userEmailVerify,{isLoading}] = useUserEmailVerifyMutation();
    const navigate = useNavigate();

    const handleSubmit =async (e) => {
        e.preventDefault();

        // Simple email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email) {
            toast.error("Email is required");
            return;
        } else if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email");
            return;
        }

        const payload = {
            email
        }
        
        try {
            const res = await userEmailVerify(payload).unwrap();
            if(res){
                console.log(res)
                toast.success(res?.msg)
                setEmail("")
                navigate(`/otp-verify?email=${email}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.data?.msg)
            
        }



        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Email Verify
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <div className="w-5  h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        ) : null}
                        Submit
                    </button>
                </form>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}
