import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username :{
        type : String,
        required : true
    },
    email :{
        type : String,
        unique : true,
        trim : true,
        index : true,
        required : true
    },

    password : {
        type : String,
        required : true
    }
})

const Users = mongoose.model("User", userSchema);

export default Users;