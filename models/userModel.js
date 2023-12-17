const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const moment = require('moment-timezone');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim:true,
    lowercase:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invali email")
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength:8
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required:true,
    trim:true,
    minLength:10,
    maxLength:10
  },
  pic:{
    type:Buffer
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
},{
  timestamps:{
    currentTime: () => Math.floor(Date.now() + 5.5 * 60 * 60 * 1000)
  }
});

userSchema.methods.toJSON = function(){
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id:this._id.toString()},"thisismysemtwoproject")
    this.tokens = this.tokens.concat({token})
    console.log(this);
    await this.save()

    return token
}

userSchema.statics.findByCredentials = async (username,password) =>{
  
  const user = await User.findOne({username})
  console.log("here: "+user);
  if(!user){
    throw new Error("Unable to login")
  }
  const isMatch =  await bcrypt.compare(password, user.password)

  if(!isMatch){
    throw new Error("Unable to login")
  }

  return user
}

userSchema.pre("save",async function (next){
  if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema);




module.exports = User;
