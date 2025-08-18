import { useState,useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";  

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate()
  useEffect(()=>{
    // console.log("Token:", localStorage.getItem("token"));
    axios.get("/users/notes",{
       headers: {
        Authorization: "Bearer " + localStorage.getItem("token")  
      }
    })
    .then(res =>{
      // console.log("Data",res.data);
      setNotes(res.data)})
    .catch(err => console.log(err))
  },[])

 
  
  const handleLogout = () => {
    navigate('/')
    alert("Logged out successfully!");
  };

  const handleNewNote = () => {
     navigate('/newNotes')
  };

  const handleDelete = async (noteId, title) => {
     try {
    await axios.delete(`/users/notes/${noteId}`,{
         headers: {
        Authorization: "Bearer " + localStorage.getItem("token")  
      },
      })
      alert(`${title}...notes deleted`);
     } catch (error) {
      alert("Notes deletion failed");
      console.log(error);
     }finally{
      window.location.reload();
     }
  };

const handleUpdate = (noteId) => {
  navigate("/updateNote", {
    state: noteId 
  });
};

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Notes</h1>
          <div className="space-x-3">
            <button 
              onClick={handleNewNote}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              New Note
            </button>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        <div className="space-y-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                  <div className="text-sm text-gray-600 mb-3">
      
                    <span className="mx-2"><strong>Created At : </strong></span>
                    <span>{note.createdAt}</span>
                    <span className="mx-2"><strong>Updated At : </strong></span>
                    <span>{note.updatedAt}</span>
                  </div>
                </div>
                <div className="space-x-2 ml-4">
                  <button 
                    onClick={() => handleUpdate(note._id, note.title,note.content)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(note._id, note.title)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="text-gray-700 leading-relaxed">
                {note.content}
              </div>
              <div>
                <img src={note.fileUrl} alt="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}