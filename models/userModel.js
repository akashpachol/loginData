 const mongoose =require("mongoose")

  const user= mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true

    },
    mobile:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    isAdmin:{
        type:Number,
        default:0,

    }
 })
 module.exports=mongoose.model("user",user)