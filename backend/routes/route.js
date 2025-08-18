import express from 'express'
import verifyToken from '../middlewares/tokenVerify.js';
const router = express.Router();
import {createUser,login,allNote,createNote, updateNote,  deleteNote } from '../controllers/controller.js'
import { upload } from '../middlewares/multer.middleware.js';

router.post("/register",createUser)
router.post('/login',login)
router.get('/notes',verifyToken, allNote);
router.post('/notes',verifyToken, upload.single("file"), createNote);
router.put('/notes/:id',verifyToken, updateNote);
router.delete('/notes/:id',verifyToken, deleteNote)
 

export default router;