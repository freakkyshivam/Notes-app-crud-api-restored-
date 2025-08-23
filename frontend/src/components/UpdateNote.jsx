import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Update() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
   

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required!");
      return;
    }
 
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please login again.");
      navigate("/login");  
      return;
    }
 
    

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Update response:", { title: title.trim(), content: content.trim() });
      alert(`${title}... note updated successfully!`);
      navigate("/notes");
    } catch (error) {
      console.error("Update error:", error);  
      
      if (error.response) {
        alert(`Update failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("Network error: Unable to reach server");
      } else {
        alert("Update failed: " + error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    navigate("/notes");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-16 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 right-16 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:bg-white/35 transform hover:scale-[1.02]">
          {/* Header with icon and gradient text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg transform hover:rotate-6 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              Update existing Note
            </h1>
            <p className="text-gray-700 font-medium">Edit and improve your existing note</p>
          </div>
          
          <div onSubmit={handleSave} className="space-y-6">
            {/* Title Field */}
            <div className="group">
              <label className="block text-sm font-bold mb-3 text-gray-800 group-focus-within:text-emerald-600 transition-colors duration-300">
                ✏️ Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg placeholder-gray-500 font-medium text-lg disabled:bg-gray-100/60 disabled:cursor-not-allowed"
                placeholder="Enter note title"
                disabled={isLoading}
              />
            </div>
            
            {/* Content Field */}
            <div className="group">
              <label className="block text-sm font-bold mb-3 text-gray-800 group-focus-within:text-emerald-600 transition-colors duration-300">
                📝 Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg placeholder-gray-500 font-medium resize-none disabled:bg-gray-100/60 disabled:cursor-not-allowed"
                placeholder="Write your note here..."
                disabled={isLoading}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                onClick={handleSave}
                disabled={isLoading}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  isLoading 
                    ? "bg-gray-400 cursor-not-allowed text-white" 
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Updating...
                  </div>
                ) : (
                  "🔄 Update Note"
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                🚫 Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="mt-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-center">
          <p className="text-gray-700 text-sm font-medium">
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-600 mr-2"></div>
                ⏳ Saving your changes...
              </span>
            ) : (
              "💡 Make your changes above and click Update to save"
            )}
          </p>
        </div>
      </div>

      <style jsx>{`
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