const express = require("express")
const SuggestionModel = require("../models/suggestionModel")
const router = new express.Router()

router.post("/", async (req,res)=>{
    try{
        console.log(req.body);
        const newuser = new SuggestionModel(req.body)
        await newuser.save()
        res.status(201).send(newuser)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get("/", async (req,res)=>{
    try{
        const user = await SuggestionModel.find({})
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
        const user = await SuggestionModel.findById(req.params.id)
        if(!user){
            res.status(400).send("User not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

// router.patch("/:id",async (req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowedUpdate = ["username","password","email","phone","skills","interests","name"]
//     const isAllowedUpdate = updates.every(update => allowedUpdate.includes(update))
//     if(!isAllowedUpdate){
//         res.status(400).send("Invalid Update")
//     }
//     try{
        
//         const user = await SuggestionModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true}) 
//         if(!user){
//             return pres.status(400).send("User not found")
//         }
//         res.status(200).send(user)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

router.delete("/:id",async (req,res)=>{
    try{
        const user = await SuggestionModel.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(400).send("user not found")
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})


module.exports = router