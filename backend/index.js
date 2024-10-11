//SERVER SIDE

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

//importing routes to controllers
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

import path from "path"; 
const _dirname=path.resolve(); //we will get current directory path 

dotenv.config({});
const app= express(); //iitialize express applicaiton i.e. instance of server





// sample api for initial testing
// app.get("/home", (req, res) => {
//     return res.status(200).json({
//         message: "I am coming from backend",
//         success: true
//     })
// })



//Add Middlewares middlewares
//The app.use() function in Express.js adds middleware to the application’s request-processing pipeline. 
//It applies the specified middleware to all incoming requests or to specific routes, allowing you to modify request/response objects, perform operations, or handle errors throughout the application.
app.use(express.json()); //converts json request to javascript objects to access throgh "req.body" 
app.use(express.urlencoded({extended: true}));// for acessing url data typically for forms data, convert request body to JavaScript object. 
app.use(cookieParser());//convers cookie header to javascript object, so to access it using req.cookies


const corsOptions = {
    origin:'http://localhost:5173', //origin that is allowed to access the resources of your server ie.frontend running at 5173 in this case. only these are allowed. can specify multiple origins by providing an array or a function to dynamically set allowed origins.
    credentials:true,//access-control-allow-credentials:true //include credentials, such as cookies, authorization headers, or TLS client certificates
}
app.use(cors(corsOptions));
const PORT= process.env.PORT ||  3000; //use env defined port or 3000

//APIs
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/user",userRoute);
// "http://localhost:8000/api/v1/user/register"
// "http://localhost:8000/api/v1/user/login"
// "http://localhost:8000/api/v1/user/profile/update"


app.use(express.static(path.join(_dirname, "/frontend/dist"))); //at production, dist folder contain index.html file which bundles all the code at one place
app.get('*', (_,res) =>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html")); //frontend serving
});
 
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listening on ${PORT}`);
});
