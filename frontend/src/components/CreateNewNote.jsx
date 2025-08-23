import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateNoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("file", file);
      
      await  axios.post("/users/notes", formData,{
         headers: {
        Authorization: "Bearer " + localStorage.getItem("token")  
         }
      })
      console.log('Note created:', { title, content, file });
      
      navigate('/notes')
    } catch (error) {
      console.log(error);
      alert("New notes creation failed")
    } finally {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:bg-white/40 transform hover:scale-[1.02]">
          {/* Header with gradient */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Create New Note
            </h1>
            <p className="text-gray-600 font-medium">Capture your thoughts and ideas</p>
          </div>
          
          <div method="POST" action="/stats" encType="multipart/form-data" onSubmit={handleSave} className="space-y-6">
            {/* Title Field */}
            <div className="group">
              <label className="block text-sm font-bold mb-3 text-gray-800 group-focus-within:text-blue-600 transition-colors duration-300">
                📝 Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg placeholder-gray-500 font-medium text-lg"
                placeholder="Enter note title"
              />
            </div>
            
            {/* Content Field */}
            <div className="group">
              <label className="block text-sm font-bold mb-3 text-gray-800 group-focus-within:text-blue-600 transition-colors duration-300">
                ✍️ Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg placeholder-gray-500 font-medium resize-none"
                placeholder="Write your note here..."
              />
            </div>

            {/* File Upload Field */}
            <div className="group">
              <label className="block text-sm font-bold mb-3 text-gray-800 group-focus-within:text-blue-600 transition-colors duration-300">
                📎 Attach File (Optional)
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="uploaded_file"
                  onChange={(e) => setfile(e.target.files[0])}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg font-medium file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer"
                />
                {file && (
                  <div className="mt-2 text-sm text-gray-600 font-medium">
                    Selected: {file.name}
                  </div>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button
                onClick={handleSave}
                type="Submit"
                disabled={loading}
                className={`flex-1 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  "💾 Save Note"
                )}
              </button>
              
              <button
                onClick={handleCancel}
                type="button"
                className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
              >
                🚫 Cancel
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional info card */}
        <div className="mt-6 bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 text-center">
          <p className="text-gray-700 text-sm font-medium">
            💡 Tip: Your notes are automatically saved with timestamps and can include file attachments
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