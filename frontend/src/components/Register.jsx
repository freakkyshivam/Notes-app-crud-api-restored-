import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function RegisterPage() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate()

 

 const handleSubmit = async (e) => {
  e.preventDefault();
  // console.log(username,email,password);
  
  try {
     await axios.post("/users/register", {
      username,
      email,
      password,
    });
    alert("User registered successfully!");
     navigate("/login")
  } catch (err) {
    console.error(err);
    alert("Registration failed");
  } 
};

  return (
   
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 p-8 rounded-3xl shadow-2xl w-full max-w-md relative z-10 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:bg-white/25">
        <h1 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
          Register
        </h1>
        
        <div method="POST" onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-800 group-focus-within:text-purple-600 transition-colors duration-300">
              Full Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg placeholder-gray-500 font-medium"
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-800 group-focus-within:text-purple-600 transition-colors duration-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg placeholder-gray-500 font-medium"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="group">
            <label className="block text-sm font-bold mb-2 text-gray-800 group-focus-within:text-purple-600 transition-colors duration-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg placeholder-gray-500 font-medium"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            onClick={handleSubmit}
            type="Submit"
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 px-6 rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-500 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 hover:-translate-y-1"
          >
            Register
          </button>
        </div>
        
        <p className="mt-6 text-center text-gray-700 font-medium">
          Already account ? 
          <Link to="/login" className="font-black ml-2 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 inline-block">
            Login
          </Link> 
        </p>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}