import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';
import { api } from '../../constants/api';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match");
        }

        try {
            const response = await axios.post(`${api}/user/register`, data);
            
            if (response?.data?.success) {
                toast.success(response.data.message);
                navigate("/login");
            } else {
                toast.error(response?.data?.message || "Signup failed");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
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
                    
                    <h1 className="text-2xl font-bold text-center text-white mb-4">Create an Account ✨</h1>

                    <form onSubmit={handleSignup} className="flex flex-col gap-4">
                        
                        {/* Username Input */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={handleOnChange}
                                required
                                placeholder="Enter username"
                                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleOnChange}
                                required
                                placeholder="Enter email"
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
                                    placeholder="Enter password"
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

                        {/* Confirm Password Input */}
                        <div className="flex flex-col">
                            <label className="text-white font-semibold">Confirm Password</label>
                            <div className="flex items-center p-3 rounded-lg border border-gray-300 bg-white">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    placeholder="Confirm password"
                                    className="w-full outline-none bg-transparent text-gray-700"
                                />
                                <span
                                    className="cursor-pointer text-gray-500 hover:text-gray-800 transition-all"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>

                        {/* Signup Button */}
                        <button className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all shadow-lg transform hover:scale-105">
                            Sign Up
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <p className="text-center text-white mt-4">
                        Already have an account? 
                        <Link to="/login" className="text-yellow-300 ml-1 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Signup;
