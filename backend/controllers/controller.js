import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Users from '../models/user.model.js'
import Note from '../models/Notes.js'
import fs from 'fs'
import fileUpload from '../utils/fileUpload.js'
 
const secretKey = 'shivamKey'


// create new user
const createUser = async (req,res)=>{
   
    try {
        // console.log(req.body);
        
         const {username, email, password} = req.body;

         if(!username || !email || !password){
            return res.status(400).json({error : "Username ,password and email must be required"})
         }
         // check email is already exist or not
         const existingEmail = await Users.findOne({email})
         if(existingEmail){
            return res.status(409).json({error : "Email is already registered"})
         }
         // encrypt password
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await Users.create({
            email,
            username,
            password : hashedPassword,
            
        });

     res.status(201).json({ message: "User created successfully",  newUser });
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

// login
const login = async (req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await Users.findOne({email});
        if(!user){
            res.status(401).json({error : "Invalid credentials"})
        }
            // decrypt password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            res.status(401).json({error : "Invalid Password or email"})
        }

        const token = jwt.sign({
            id : user._id,
            email : user.email
        }, secretKey, {expiresIn : "1h"})
        res.json({token,user})
    } catch (error) {
         console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

// all note -> only show who login and only see own notes
const allNote = async (req,res)=>{
   try {
      
     const notes = await Note.find({ user: req.user.id })
     .sort({ createdAt: -1 });
     res.json(notes);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
}

// create notes
const createNote = async (req,res)=>{
    try {
      const { title, content } = req.body;
      let fileUrl = null;
//  console.log("file url ", req.file);
    if (req.file) {
      const cloudRes = await fileUpload(req.file.path);   
      fileUrl = cloudRes.secure_url;
      fs.unlinkSync(req.file.path);
    }
        const note = await Note.create({
            title,
            content,
            fileUrl,
            user: req.user.id 
        });
        await note.save();
        res.status(201).json(note)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

// update existing notes
const updateNote = async (req,res)=>{
    try {
 const updatedNote = await Note.findByIdAndUpdate(
             { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }  
        );
        if (!updatedNote) {
            return res.status(404).json({ error: "Note not found" });
        }
         res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote
        });
    } catch (error) {
         res.status(400).json({error : error.message})
    }
}

// delete notes
const deleteNote = async (req,res)=>{
    try {
   const deleteNote = await Note.findByIdAndDelete({
      _id: req.params.id,
            user: req.user.id 
   });
         if(!deleteNote){
            res.send("Notes not found")
            return ;
         }
        res.json({message : "Note deleted"})
    } catch (error) {
         res.status(400).json({error : error.message})
    }
}

 

export {createUser,login,allNote,createNote, updateNote,  deleteNote}