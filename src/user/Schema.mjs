import mongoose from "mongoose"


 const Userschema=mongoose.Schema({
    username:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    password:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.String,
        enum:["user","admin"],
        default:"user"
    }

})
export const User = mongoose.model('user',Userschema)