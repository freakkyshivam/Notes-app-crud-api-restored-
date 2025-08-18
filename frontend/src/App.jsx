 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/Register"
import NotesPage from "./components/Notes";
 import CreateNoteForm from "./components/CreateNewNote";
 import LoginPage from "./components/Login";
 import Update from "./components/updateNote";
function App() {
   

  return (
    <>
     
 
        <Routes>
          <Route path="/" element = { <RegisterPage/>}/>
          <Route path="/notes" element = {<NotesPage/>}/>
          <Route path="/newNotes" element = {<CreateNoteForm/>}/>
          <Route path="/login" element = {<LoginPage/>}/>
           <Route path="/updateNote" element={<Update />}/>
        </Routes>
      
    </>
  )
}

export default App
