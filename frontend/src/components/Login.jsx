 
import axios from 'axios'
import { Link, useNavigate} from "react-router-dom";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  const handleClick = ()=>{
    navigate('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post("/users/login", { email, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        alert(`Welcome, ${res.data.user.username}`);
        navigate('/notes')
      })
      .catch(err => {
        alert("Login failed");
        console.error(err);
      });
 
    // alert("Login form submitted - integrate with your backend");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-r from-violet-400/20 to-indigo-400/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-32 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-75"></div>
              <div className="relative p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl">
                <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h1 className="mt-6 text-4xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-600 font-medium">Sign in to access your notes</p>
          </div>

          {/* Login Card */}
          <div className="relative group">
            {/* Card Background with Glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
            
            {/* Card Content */}
            <div className="relative p-8 lg:p-10">
              <form method='POST' onSubmit={handleSubmit} className="space-y-8">
                {/* Email Field */}
                <div className="relative group/field">
                  <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within/field:text-blue-600 transition-colors duration-200">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400 group-focus-within/field:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-gray-800 placeholder-gray-400"
                      placeholder="Enter your email address"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Password Field */}
                <div className="relative group/field">
                  <label className="block text-sm font-bold text-gray-700 mb-3 group-focus-within/field:text-blue-600 transition-colors duration-200">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400 group-focus-within/field:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg transition-all duration-300 text-gray-800 placeholder-gray-400"
                      placeholder="Enter your password"
                      required
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Login Button */}
                <button
                  type="submit"
                  className="group/btn relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    <span className="text-lg">Sign In</span>
                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-active/btn:opacity-100 transition-opacity duration-150"></div>
                </button>
              </form>
              
              {/* Create Account Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Don't have an account?</p>
                {/* Replace with your actual Link component */}
                <button className="group relative inline-flex items-center space-x-2 text-blue-600 font-bold hover:text-purple-600 transition-colors duration-200">
                  <span className="relative" onClick={handleClick}>
                    Create Account
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                  </span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
                
                {/* <Link to={"/"} className="group relative inline-flex items-center space-x-2 text-blue-600 font-bold hover:text-purple-600 transition-colors duration-200">
                  <span className="relative">
                    Create Account
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></div>
                  </span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link> */}
               
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}