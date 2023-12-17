const mongoose = require("mongoose")
const validator = require("validator")
const moment = require("moment-timezone")

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:"true",
        unique:true
    },
    author:{
        type:String,
        required:true,
        trim:"true"
    },
    content:{
        type:String,
        required:true,
        trim:"true",
        minLength:500
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    image:{
        type:Buffer,
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:{
      currentTime: () => Math.floor(Date.now() + 5.5 * 60 * 60 * 1000)
    }
  })


const Blog = mongoose.model("Blog",BlogSchema)

module.exports = Blog