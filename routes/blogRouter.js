
const express = require("express")
const BlogModel = require("../models/blogModel")
const router = new express.Router()
const multer = require("multer")

const uploadImage = multer({
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

router.post("/:id/image", uploadImage.single("image"),async (req,res)=>{
    try {
        const blog = await BlogModel.findById(req.params.id)
        blog.image = req.file.buffer
        await blog.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
    next()
})

router.get("/:id/image",async (req,res)=>{
    try {
        const blog = await BlogModel.findById(req.params.id)
        if(!blog.image){
            throw new Error()
        }
        res.set("Content-Type","image/jpg")
        res.send(blog.image)
    } catch (error) {
        res.status(500).send(error)
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
    next()
})

router.post("/", async (req,res)=>{
    try{
        console.log(req.body);
        const newuser = new BlogModel(req.body)
        await newuser.save()
        res.status(201).send(newuser)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/", async (req,res)=>{
    try{
        const user = await BlogModel.find({})
        if(!user){
            res.status(400).send("Blog not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const user = await BlogModel.findById(req.params.id)
        if(!user){
            res.status(400).send("Blog not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch("/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["title","content","image","likes","comments"]
    const isAllowedUpdate = updates.every(update => allowedUpdate.includes(update))
    if(!isAllowedUpdate){
        res.status(400).send("Invalid Update")
    }
    try{
        
        const user = await BlogModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
        if(!user){
            return pres.status(400).send("Blog not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete("/:id",async (req,res)=>{
    try{
        const user = await BlogModel.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("Blog not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router