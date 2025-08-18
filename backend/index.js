import dotenv from 'dotenv'
dotenv.config({
    path : "../.env"
})
import express from 'express'
import router from './routes/route.js'
import connectDB from './db/db.js'
import cors from 'cors'


cors({
    origin : "http://localhost:5173/",
    credentials : true
})

const port = process.env.PORT;
const dbLink = process.env.DB_LINK

// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✅ Loaded" : "❌ Missing",
//   api_key: process.env.CLOUDINARY_CLOUD_API_KEY ? "✅ Loaded" : "❌ Missing",
//   api_secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY ? "✅ Loaded" : "❌ Missing"
// });

// console.log("Cloudinary ENV:", {
//   name: process.env.CLOUDINARY_CLOUD_NAME,
//   key: process.env.CLOUDINARY_CLOUD_API_KEY,
//   secret: process.env.CLOUDINARY_CLOUD_SECRET_KEY
// });
const app = express();

app.use(express.json());

app.use('/users', router)

connectDB(dbLink)
 
    app.listen(port, ()=>{
        console.log(`Server listenning on http://localhost:${port}/users`);
        
    })
 
 