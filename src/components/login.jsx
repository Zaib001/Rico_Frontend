import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      {/* Sidebar with Logo, Menu, and Social Icons */}
      <div
        className="absolute inset-0 backdrop-blur-lg bg-opacity-100"
        style={{ borderRadius: "inherit" }}
      ></div>
      <div className="bg-transparent absolute left-0 top-10 h-full w-44 flex flex-col items-center py-8 space-y-6 rounded-tl-lg shadow-2xl">
        <h1 className="text-4xl font-bold text-lime-400">LiiQwise</h1>

        <div className="flex flex-col items-center space-y-6 absolute left-30 top-[35rem]">
          <a href="#" className="text-lime-400 text-4xl hover:text-lime-700">
            <FaInstagram />
          </a>
          <a href="#" className="text-lime-400 text-4xl hover:text-lime-700">
            <FaTwitter />
          </a>
          <a href="#" className="text-lime-400 text-4xl hover:text-lime-700">
            <FaFacebookF />
          </a>
        </div>
      </div>

      {/* Login Form and Image */}
      <div className="rounded-lg shadow-2xl flex overflow-hidden max-w-4xl w-full relative">
        {/* Glass effect background */}
        <div
          className="absolute inset-0 backdrop-blur-lg bg-opacity-100"
          style={{ borderRadius: "inherit" }}
        ></div>

        {/* Image Section */}
        <div className="hidden lg:block w-1/2 bg-gray-700 flex items-center justify-center relative z-10">
          <img
            src="https://images.unsplash.com/photo-1621829845053-c8114fc01eb3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gray-900 relative z-10">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">Login</h2>
          <p className="text-gray-400 mb-6">
            Enter your details to sign in to your account
          </p>

          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="email">
                Email/Username
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your username/email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 text-black py-3 rounded-lg hover:bg-lime-500 transition-all duration-300"
            >
              LogIn
            </button>

            <p className="text-sm text-lime-400 text-center mt-3 cursor-pointer">
              Having trouble signing in?
            </p>

            {/* Divider */}
            <div className="mt-6 mb-6">
              <hr className="w-full border-gray-600" />
              <div className="flex justify-center">
                <span className="px-3 text-gray-500">Or sign in with</span>
              </div>
              <hr className="w-full border-gray-600" />
            </div>

            {/* Sign Up Link */}
            <p className="text-sm text-center text-gray-400">
              Don’t have an account?{" "}
              <a href="/signup" className="text-lime-400">
                Sign up now
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
