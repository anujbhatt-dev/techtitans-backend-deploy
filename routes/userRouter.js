const express = require("express")
const UserModel = require("../models/userModel");
const User = require("../models/userModel");
const userAuth = require("../middleware/userAuth");
const router = new express.Router()
const multer = require("multer")

const uploadPic = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg)$/)){
            cb(new Error("upload image"))
        }
        cb(undefined,true)
    }
})

router.post("/me/pic",userAuth, uploadPic.single("pic"),async (req,res)=>{
    try {
        req.user.pic = req.file.buffer
        await req.user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
    next()
})

router.get("/:id/pic",async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.id)
        if(!user.pic){
            throw new Error()
        }
        res.set("Content-Type","image/jpg")
        res.send(user.pic)
    } catch (error) {
        res.status(500).send(error)
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
    next()
})

router.post("/", async (req,res)=>{
    try{
        const newuser = new UserModel(req.body)
        await newuser.save()
        const token = await newuser.generateAuthToken()
        res.status(201).send({newuser,token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/me",userAuth,(req,res)=>{
    res.status(200).send(req.user)
})

router.post("/login",async (req,res)=>{
    try{
        const user = await UserModel.findByCredentials(req.body.username,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/logout",userAuth,async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter(token => token.token !== req.token)
        console.log(req.user.tokens);
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post("/logoutAll",userAuth,async (req,res)=>{
    try{
        req.user.tokens=[]
        console.log(req.user.tokens);
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get("/", async (req,res)=>{
    try{
        const user = await UserModel.find({})
        if(!user){
            res.status(400).send("User not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const user = await UserModel.findById(req.params.id)
        if(!user){
            res.status(400).send("User not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch("/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["username","password","email","phone","skills","interests","name"]
    const isAllowedUpdate = updates.every(update => allowedUpdate.includes(update))
    if(!isAllowedUpdate){
        res.status(400).send("Invalid Update")
    }
    try{
        
        // const user = await UserModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
        const user = await UserModel.findById(req.params.id)
        updates.forEach((update)=> user[update]=req.body[update])
        if(!user){
            return res.status(400).send("User not found")
        }
        await user.save()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const user = await UserModel.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("user not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router