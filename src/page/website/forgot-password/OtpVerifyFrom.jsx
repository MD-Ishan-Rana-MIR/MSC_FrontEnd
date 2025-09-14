import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useUserEmailVerifyMutation, useUserOtpVerifyMutation } from "@/redux/auth-api/authApi";

export default function OtpVerifyFrom() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const emailFromQuery = queryParams.get("email") || "";

    const [email, setEmail] = useState(emailFromQuery);
    const [otp, setOtp] = useState("");
    const [userOtpVerify, { isLoading }] = useUserOtpVerifyMutation();

    useEffect(() => {
        setEmail(emailFromQuery);
    }, [emailFromQuery]);
    const payload = {
        email,
        otp
    }

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!otp) {
            toast.error("OTP is required");
            return;
        }

        try {
            const res = await userOtpVerify(payload).unwrap();
            if (res) {
                console.log(res)
                navigate(`/new-password-set?email=${email}`);
                toast.success(res?.msg)
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.msg)

        }


    };

    const [userEmailVerify, { isLoading: otpLoading }] = useUserEmailVerifyMutation()

    const handleResendOTP = async () => {
        const payload = {
            email
        }
        try {
            const res = await userEmailVerify(payload).unwrap();
            if (res) {
                console.log(res)
                toast.success(res?.msg)
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
                    Verify Your Email
                </h2>
                <p className="text-gray-600 mb-6 text-center">
                    An OTP has been sent to <span className="font-medium">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl py-3 px-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading && (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        )}
                        Verify OTP
                    </button>
                </form>

                <button
                    onClick={handleResendOTP}
                    disabled={otpLoading}
                    className="mt-4 w-full cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                >
                    {otpLoading && (
                        <div className="w-5 h-5 border-2 cursor-pointer border-gray-400 border-t-gray-800 rounded-full animate-spin mr-2"></div>
                    )}
                    Resend OTP
                </button>
            </div>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}
