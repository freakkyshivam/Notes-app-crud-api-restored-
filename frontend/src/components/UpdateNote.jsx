import { useState  } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
 
    if (!id) {
      alert("Note ID is missing!");
      return;
    }

    setIsLoading(true);

    try {
       
      const response = await axios.put(
        `/users/notes/${id}`,  
        { title: title.trim(), content: content.trim() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Update response:", response.data);  
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Update existing Note</h1>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter note title"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Write your note here..."
                disabled={isLoading}
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded transition-colors text-white ${
                  isLoading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isLoading ? "Updating..." : "Update Note"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors disabled:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}