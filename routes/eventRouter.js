const express = require("express")
const userAuth = require("../middleware/userAuth")
const EventModel = require("../models/eventModel")
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
        const event = await EventModel.findById(req.params.id)
        console.log("here ");
        event.image = req.file.buffer
        await event.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error)
    }

},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
    next()
})

router.get("/:id/image",async (req,res)=>{
    try {
        const event = await EventModel.findById(req.params.id)
        if(!event.image){
            throw new Error()
        }
        res.set("Content-Type","image/jpg")
        res.send(event.image)
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
        const newEvent = new EventModel(req.body)
        console.log(newEvent);
        await newEvent.save()
        res.status(201).send(newEvent)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/", async (req,res)=>{
    try{
        const user = await EventModel.find({})
        if(!user){
            res.status(400).send("Event not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const user = await EventModel.findById(req.params.id)
        
        if(!user){
            res.status(400).send("Event not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.patch("/:id",async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["name","eventDate","eventTime","registered","leaderboard","status","type"]
    const isAllowedUpdate = updates.every(update => allowedUpdate.includes(update))
    if(!isAllowedUpdate){
        res.status(400).send("Invalid Update")
    }
    try{
        
        const user = await EventModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
        if(!user){
            return pres.status(400).send("Event not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post("/register/:id",userAuth,async (req,res)=>{
        try {
            const event = await EventModel.findById(req.params.id)
            console.log(event.registered);
            event.registered= event.registered.concat(req.user.id)
            console.log(event.registered);
            await event.save()
            res.status(201).send("registered")
        } catch (error) {
            res.status(500).send(error)
        }
})

// router.post("/leaderboard/:id",userAuth,async (req,res)=>{
//     try {
//         const event = await EventModel.findById(req.params.id)
//         event.leaderboard= event.leaderboard.concat()
//         await event.save()
//         res.status(201).send("registered")
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

router.delete("/:id",async (req,res)=>{
    try{
        const user = await EventModel.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("Event not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router