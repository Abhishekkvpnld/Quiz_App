import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { api } from '../../constants/api';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "user@gmail.com", password: "User@123" });

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${api}/user/login`, data, { withCredentials: true });

            if (response?.data?.success) {
                toast.success(response?.data?.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Login failed");
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="container mx-auto p-5 flex items-center justify-center">
                <div className="w-full max-w-md p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-2xl border border-white border-opacity-30">
                    
                    <h1 className="text-2xl font-bold text-center text-white mb-4">Welcome Back 👋</h1>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        
                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                placeholder="Enter your email"
                                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold">Password</label>
                            <div className="flex items-center p-3 rounded-lg border border-gray-300 bg-white">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required
                                    placeholder="Enter your password"
                                    className="w-full outline-none bg-transparent text-gray-700"
                                />
                                <span
                                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition-all"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <Link to="/forgot-password" className="text-white text-sm text-right hover:underline">
                            Forgot password?
                        </Link>

                        {/* Login Button */}
                        <button className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all shadow-lg transform hover:scale-105">
                            Login
                        </button>
                    </form>

                    {/* Signup Redirect */}
                    <p className="text-center text-white mt-4">
                        Don't have an account? 
                        <Link to="/signup" className="text-yellow-300 ml-1 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
