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

 
const app = express();

app.use(express.json());

app.use('/users', router)

connectDB(dbLink)
 
    app.listen(port, ()=>{
        console.log(`Server listenning on http://localhost:${port}/users`);
        
    })
 
 