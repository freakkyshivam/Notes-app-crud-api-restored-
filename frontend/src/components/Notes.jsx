import { useState, useEffect } from "react";
 
// Replace these with your actual imports and functions:
import axios from "axios"
import { useNavigate } from "react-router-dom";  


export default function NotesPage() {
  const [notes, setNotes] = useState([
  ]);
  
  const navigate = useNavigate()
   
  useEffect(()=>{
    // console.log("Token:", localStorage.getItem("token"));
    axios.get("/users/notes",{
       headers: {
        Authorization: "Bearer " + localStorage.getItem("token")  
      }
    })
    .then(res =>{
      console.log("Data",res.data);
      setNotes(res.data)})
    .catch(err => console.log(err))
  },[])
  

  const handleLogout = () => {
    navigate('/')
    alert("Logged out successfully!");
  };

  const handleNewNote = () => {
     navigate('/newNotes')
     alert("Navigate to new notes page");
  };

  const handleDelete = async (noteId, title) => {
     try {
       
       await axios.delete(`/users/notes/${noteId}`,{
         headers: {
           Authorization: "Bearer " + localStorage.getItem("token")  
         },
       })
        
       alert(`${title}...notes deleted`);
        
       setNotes(notes.filter(note => note._id !== noteId));
     } catch (error) {
       alert("Notes deletion failed");
       console.log(error);
     }finally{
       window.location.reload();
     }
  };

  const handleUpdate = (noteId, title, content) => {
    navigate("/updateNote", {
      state: { id: noteId, title, content } 
    });
  };

   
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-x-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-400/10 to-yellow-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              {/* Logo/Title Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-sm opacity-75"></div>
                  <div className="relative p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent">
                    My Notes
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">Organize your thoughts beautifully</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handleNewNote}
                  className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">New Note</span>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300"></div>
                </button>
                
                
                
                <button 
                  onClick={handleLogout}
                  className="group relative px-6 py-3 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-rose-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="hidden sm:inline">Logout</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Content */}
        <div className="max-w-7xl mx-auto p-6 lg:p-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note, index) => (
              <div 
                key={note._id} 
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl border border-white/50 overflow-hidden transform hover:-translate-y-2 hover:rotate-1 transition-all duration-500"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {/* Card Header with Gradient */}
                <div className="relative p-8 pb-6">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 min-w-0 pr-4">
                      <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {note.title}
                      </h2>
                      
                      {/* Timestamps with Icons */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="p-1 bg-emerald-100 rounded-lg">
                            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-semibold">Created:</span>
                          <span className="text-gray-700">
                            {new Date(note.createdAt).toLocaleString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="p-1 bg-blue-100 rounded-lg">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <span className="font-semibold">Updated:</span>
                          <span className="text-gray-700">
                            {new Date(note.updatedAt).toLocaleString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                      <button 
                        onClick={() => handleUpdate(note._id, note.title, note.content)}
                        className="relative p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 group/btn overflow-hidden"
                        title="Update Note"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                        <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(note._id, note.title)}
                        className="relative p-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 group/btn overflow-hidden"
                        title="Delete Note"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                        <svg className="relative w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Note Content */}
                <div className="px-8 pb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200/50 shadow-inner">
                      <p className="text-gray-800 leading-relaxed text-base line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                        {note.content}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Note Image */}
                {note.fileUrl && (
                  <div className="px-8 pb-8">
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                      <img 
                        src={note.fileUrl} 
                        alt="Note attachment" 
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 filter group-hover:brightness-110 group-hover:contrast-105"
                      />
                      <div className="absolute bottom-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Hover Effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-sm"></div>
                
                {/* Bottom Accent Animation */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-8 right-8 z-50 md:hidden">
        <button 
          onClick={handleNewNote}
          className="relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-200 flex items-center justify-center group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
          <svg className="relative w-8 h-8 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-active:opacity-100 transition-opacity duration-150"></div>
        </button>
      </div>
    </div>
  );
}