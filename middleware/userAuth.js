const jwt = require("jsonwebtoken")
const UserModel = require("../models/userModel")

const userAuth = async (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ","")
        // console.log(token);
        const decode = jwt.verify(token,"thisismysemtwoproject")
        const user  = await UserModel.findOne({_id:decode._id,"tokens.token":token})
    if(!user){
        throw new Error()
    }
    req.token = token
    req.user = user
    next()
    } catch (error) {
        res.status(500).send({error:"unable to authenticate"})
    }
}

module.exports = userAuth