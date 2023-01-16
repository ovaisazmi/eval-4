const jwt=require("jsonwebtoken");

const validator=(req,res,next)=>{
    const token =req.headers.authorization;
    
    if(token){
        const decode=jwt.verify(token,"seckey",(err,decoded)=>{
            if(err){
                console.log("Login Please");
                res.send({"mes":"Login Please"})
            }else{
                req.body.userID=decoded.userID;
                next();
            }
        })
    }else{
        console.log("Login Please");
        res.send({"mes":"Login Please"})
    }
}






module.exports={validator}