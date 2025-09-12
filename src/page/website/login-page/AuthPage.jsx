import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useUserLoginMutation } from '@/router/auth-api/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirm_password: '',
    });
    const { email, password, confirm_password } = formData;
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const payload = { email, password, confirm_password };
    const [userLogin] = useUserLoginMutation();

    const validateForm = () => {
        const newErrors = {};
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
        if (!password) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!confirm_password) newErrors.confirm_password = 'Confirm password is required';
        else if (confirm_password.length < 6) newErrors.confirm_password = 'Confirm password must be at least 6 characters';
        else if (password !== confirm_password) newErrors.confirm_password = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const res = await userLogin(payload).unwrap();
            if (res) {
                console.log(res)
                localStorage.setItem("user-token", res?.token)
                toast.success(res?.message || 'Login successful');
                window.location.href = "/";
            }
        } catch (error) {
            toast.error(error?.data?.msg || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const navigate = useNavigate();
    const token = localStorage.getItem("user-token");

    useEffect(() => {
        if (token) {
            navigate("/"); // Use react-router navigation instead of window.location.href
        }
    }, [token, navigate]);


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white">
            <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-md ">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4 flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                    <p className="text-black/80">Sign in to your account</p>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            value={email}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-black rounded-xl py-3 pl-12 pr-4 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        />
                        {errors.email && <p className="text-red-600 text-sm ml-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60" />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-black rounded-xl py-3 pl-12 pr-12 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/60 hover:text-black transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        {errors.password && <p className="text-red-600 text-sm ml-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black/60" />
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={confirm_password}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-black rounded-xl py-3 pl-12 pr-12 text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black/60 hover:text-black transition-colors"
                        >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                        {errors.confirm_password && <p className="text-red-600 text-sm ml-1">{errors.confirm_password}</p>}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer bg-black hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex justify-center items-center"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-black/80">
                        Don't have an account? <Link className="underline" to="/registration">Register</Link>
                    </p>
                </div>
            </div>

            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}
