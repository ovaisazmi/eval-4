const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {postModel}=require("../model/postsModel");

const post_router=express.Router();




post_router.post("/create",async(req,res)=>{
    let payload=req.body;
    try {
        let newpost=new postModel(payload);
        await newpost.save();
        res.send({"mes":"Note Created"});
    } catch (error) {
        console.log(error.message);
        res.send({"mes":"Error While Creating Note"})
    }
})


post_router.patch("/update/:id",async(req,res)=>{
    let payload=req.body;
    let paramid=req.params.id;
    let data=await postModel.findOne({_id:paramid})
    if(data.userID==payload.userID){
        
        try {
            let updated=await postModel.findByIdAndUpdate({_id:paramid},payload)
            res.send({"mes":"Note Updated"})    
        } catch (error) {
            console.log(error.message);
            res.send({"mes":"Error While Updating Note"})
        }
    }else{
        res.send({"mes":"You do not have athority for Updating the Note"})
    }
})



post_router.delete("/delete/:id",async(req,res)=>{
    let payload=req.body;
    let paramid=req.params.id;
    let data=await postModel.findOne({_id:paramid})
    if(data.userID==payload.userID){
        
        try {
            let updated=await postModel.findByIdAndDelete({_id:paramid})
            res.send({"mes":"Note Deleted"})    
        } catch (error) {
            console.log(error.message);
            res.send({"mes":"Error While Deleting Note"})
        }
    }else{
        res.send({"mes":"You do not have athority for Deleting the Note"})
    }
})

post_router.get("/",async(req,res)=>{
    try {
        let data= await postModel.find({userID:req.body.userID})
        res.send(data) 
    } catch (error) {
        
    }
})




// user_router.post("/register",async(req,res)=>{
//     let {name,email,gender,password}=req.body;

//     try {
//         bcrypt.hash(password,5,async(err,hashed_data)=>{
//             let user=new userModel({name,email,gender,password:hashed_data});
//             await user.save();
//             res.send({"mes":"User Registered","user":user})
//         })   
//     } catch (error) {
//         res.send({"Error":error.message})
//     }
// })







module.exports={post_router}