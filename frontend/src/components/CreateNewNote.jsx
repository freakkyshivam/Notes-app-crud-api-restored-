import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   const [file, setfile] = useState(null);
   const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

  const handleSave = async (e) => {
  e.preventDefault();  
    setLoading(true);

     if (!title.trim()) {
      alert("Title is required");
      setLoading(false);
      return;
    }
    if (!content.trim()) {
      alert("Content is required");
      setLoading(false);
      return;
    }
    // if (!file) {
    //   alert("Photo/file is required");
    //   setLoading(false);
    //   return;
    // }

  try {
     const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("file", file);
    await axios.post("/users/notes", formData,{
     headers: {
        Authorization: "Bearer " + localStorage.getItem("token") // JWT token
      }
      
   })
   navigate('/notes')
  } catch (error) {
    console.log(error);
    alert("New notes creation failed")
  }finally {
      setLoading(false);
    }    
  }
  

   const handleCancel = () => {
    setTitle("");
    setContent("");
    setfile(null);
    navigate('/notes');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Note</h1>
          
          <form method="POST"  action="/stats" enctype="multipart/form-data" onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter note title"
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
              />
            </div>

              <div>
              <input
                type="file"
                 name="uploaded_file"
                 onChange={(e) => setfile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                
              />
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                type="Submit"
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
              >
                {loading ? "Saving..." : "Save Note"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition-colors"
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