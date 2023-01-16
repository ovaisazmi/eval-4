const express=require("express");
const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {userModel}=require("../model/userModel");

const user_router=express.Router();

user_router.post("/register",async(req,res)=>{
    let {name,email,gender,password}=req.body;

    try {
        bcrypt.hash(password,5,async(err,hashed_data)=>{
            let user=new userModel({name,email,gender,password:hashed_data});
            await user.save();
            res.send({"mes":"User Registered","user":user})
        })   
    } catch (error) {
        res.send({"Error":error.message})
    }
})

user_router.post("/login",async(req,res)=>{
    let {email,password}=req.body;
    let user=await userModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user[0]._id},"seckey");
                res.send({"mes":"Login Successful","token":token});
            }else{
                res.send({"mes":"Wrong Credentials"});
            }
        })
    }else{
        res.send({"mes":"Wrong Credentials"});
    }
    
})






module.exports={user_router}