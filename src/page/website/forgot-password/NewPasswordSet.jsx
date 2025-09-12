import { useNewPasswordSetMutation } from "@/router/auth-api/authApi";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function NewPasswordSet() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // get email from params
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const emailParam = params.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, []);

    const [newPasswordSet, { isLoading }] = useNewPasswordSetMutation();

    const payload = {
        email,
        password
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await newPasswordSet(payload).unwrap();
            

            if (res) {
                toast.success(res?.msg)
                localStorage.clear("user-token");
                window.location.href = "/"
            }

        } catch (error) {
            toast.error(error?.msg)
            console.log(error)

        }

    };




    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-center mb-4">Set Your Password</h2>

                {/* show email from query */}
                <p className="text-center text-gray-600 mb-6">Email: <span className="font-medium">{email}</span></p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                        {isLoading && (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        )}
                        Set password
                    </button>
                </form>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}
