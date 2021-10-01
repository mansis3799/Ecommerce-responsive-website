const express=require("express");
const app=express();

const port=8000;

const admin=(req,res)=>{
   res.send("Home dashboard");
}
const isloggedIn=(req,res,next)=>{
   console.log("Succcessfully logged in...");
   next();
}
const isAdmin=(req,res,next)=>{
   console.log("isAdmin is running");
   next();
}
app.get("/admin",isloggedIn,isAdmin,admin);//isloggedIn and isAdmin are middlewares

app.get("/contact",(req,res)=>{
    res.send("This is contact page");
 })
 app.get("/about",(req,res)=>{
    res.send("This is about page");
 })
app.listen(port,()=>{
    console.log("port is succesfully running on 8000");
})


