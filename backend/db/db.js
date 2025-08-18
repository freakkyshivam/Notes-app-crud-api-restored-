import mongoose from "mongoose";

const connectDB = async (DB_LINK)=>{
    try {
        await mongoose.connect(DB_LINK)
        console.log("✅ Database connected successfully...!!");
        
    } catch (error) {
        console.log("❌ Database connection failed....!! ");
        console.log(error);
    }
}

export default connectDB;