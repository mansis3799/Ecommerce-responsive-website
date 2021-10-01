require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authroutes = require("./routes/auth");
const userroutes = require("./routes/user");
const contactroutes = require("./routes/contact");
const categoryroutes = require("./routes/category");
const productroutes = require("./routes/product");
const orderroutes = require("./routes/order");
const paymentroutes = require("./routes/paymentroutes");
//const contactroutes = require("./routes/contact");



mongoose.connect(process.env.DATABASE, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true})
 .then(()=>{
     console.log("DB CONNECTED");
 }).catch(()=>{
     console.log("ERROR OCCURED");
 })

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/api",authroutes);
app.use("/api",userroutes);
app.use("/api",contactroutes);
app.use("/api",categoryroutes);
app.use("/api",productroutes);
app.use("/api",orderroutes);
app.use("/api",paymentroutes);
//app.use("/api",contactroutes);


const port=process.env.PORT || 8000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
