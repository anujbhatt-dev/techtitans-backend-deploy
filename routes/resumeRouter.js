const express =require("express")
const router = new express.Router()
const ResumeModel = require("../models/resumeModel")
const userAuth = require("../middleware/userAuth");

router.post("/",userAuth, async (req,res)=>{
    try {
        const alreadyExists = await ResumeModel.findOne({userId:req.user._id}) 
        if(alreadyExists){
            throw new Error("resume already exists")
        }
        const newResume = new ResumeModel({userId:req.user._id,...req.body})
        if(!newResume){
            res.status(400).send({error:"something went wrong!"})
        }
        await newResume.save()
        res.status(201).send(newResume)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get("/",userAuth,async(req,res)=>{
    try {
        const resume = await ResumeModel.findOne({userId:req.user._id})
        if(!resume){
           return res.status(200).send({message:"resume unavailable!"})
        }
        return res.send(resume)
    } catch (error) {
        res.status(500).send(error)
    }
})


router.patch("/",userAuth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ["education","experiences","projects","certifications","skills","interests","objective"]
    const isAllowedUpdate = updates.every(update => allowedUpdate.includes(update))
    if(!isAllowedUpdate){ 
        res.status(400).send("Invalid Update")
    }
    try { 
        const alreadyExists = await ResumeModel.findOne({userId:req.user._id}) 
        if(!alreadyExists){
            throw new Error("resume does not exists") 
        }
        updates.forEach((update)=> alreadyExists[update]=req.body[update])
        await alreadyExists.save()
        res.status(200).send(alreadyExists)
        
    } catch (error) {
        res.status(500).send(error)
    }
})


router.delete("/",userAuth,async (req,res)=>{
    try {
        const resume = await ResumeModel.findOne({userId:req.user._id}) 
        if(!resume){
            throw new Error("resume does not exists")
        }
        await ResumeModel.deleteOne({userId:req.user._id})
        res.status(200).send("resume deleted")
    } catch (error) {
        res.status(200).send(error)
    }
    

})

module.exports = router