const express=require("express")
require("dotenv").config();
const cors=require("cors");
const app=express();
const {connection}=require("./config/db")
const {user_router}=require("./route/user_Router")
const {post_router}=require("./route/post_Router")
const {validator}=require("./middleware/validator")
app.use(express.json())

app.use("/users",user_router);

app.use(validator);

app.use("/posts",post_router);

app.get("/",(req,res)=>{
    res.send("Home Pagee")
})



app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message); 
    }
    console.log("server is running "+process.env.port);
}) 