const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
      type:String,
      unique:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profileImg:{
        type:String
    },
    is_admin:{
        type:Boolean,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    is_block:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Student',userSchema)