 
import { useState } from "react";
import axios from 'axios'
 import { Link, useNavigate} from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   const navigate = useNavigate()
   const handleSubmit =async (e) => {
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
  };

  return (
   
     <div className="min-h-screen flex items-center justify-center bg-gray-100" >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        
        <form method="POST" onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="Submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <Link to={"/"} className="font-bold">Create acount</Link>
      </div>
    </div>
    
  );
}