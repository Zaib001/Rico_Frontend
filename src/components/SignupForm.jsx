import React, { useState } from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaBars } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
  
    try {
      await signup({ name: formData.name, email: formData.email, password: formData.password });
    } catch (err) {
      setError(err.message);
    }
  };
  
 
 
 
 
 

 
 
 
 
 
 
 
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative">
      {/* Sidebar with Logo, Menu, and Social Icons */}
      <div className="absolute left-0 top-10 h-full w-44 rounded-lg shadow-2xl flex flex-col items-center py-8 space-y-6">
        {/* <button className="text-lime-400 text-2xl"> */}
          {/* <FaBars /> */}
        {/* </button> */}
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

      {/* Card Container with Glass Effect */}
      <div className="bg-gray-800 rounded-lg shadow-2xl flex overflow-hidden max-w-4xl w-full relative">
        {/* Glass effect background */}
        <div
          className="absolute inset-0 backdrop-blur-lg bg-white bg-opacity-20"
          style={{ borderRadius: "inherit" }}
        ></div>

        {/* Left Side - Image */}
        <div className=" lg:block w-1/2 bg-gray-700 items-center justify-center relative z-10">
          <img
            src="https://images.unsplash.com/photo-1621829845053-c8114fc01eb3?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-gray-900 relative z-10">
          <h2 className="text-3xl font-bold text-lime-400 mb-4">Sign Up</h2>
          
          <p className="text-gray-400 mb-6">Create a new account</p>
          {error && <p className="text-red-500">{error}</p>}
          {/* Input Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-400 mb-1"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-lime-400 focus:outline-none"
              />
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-lime-400 text-black py-3 rounded-lg hover:bg-lime-500 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Help Text */}
          <p className="text-sm text-lime-400 text-center mt-3 cursor-pointer">
            Already have an account?{" "}
            <a href="/login" className="text-lime-400">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
