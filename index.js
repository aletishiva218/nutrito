import express from "express"
import cors from "cors";

import register from "./Routes/routes/register.js";
import login from "./Routes/routes/login.js";
import profileSettings from "./Routes/routes/profileSettings.js";
import scansSettings from "./Routes/routes/scansSettings.js";
import settingsSettings from "./Routes/routes/settingsSettings.js";
import nutrilization from "./Routes/routes/nutrilization.js";
import postCreate from "./Routes/routes/postCreate.js";

import registerMiddleware from "./Routes/middlewares/register.js";
import loginMiddleware from "./Routes/middlewares/login.js";
import settingsMiddleware from "./Routes/middlewares/settings.js";
import nutrilizationMiddleware from "./Routes/middlewares/nutrilization.js";
import postMiddleware from "./Routes/middlewares/post.js";


import dotenv from "dotenv";
dotenv.config()

const port = process.env.PORT;
const secretKey = process.env.SECRET_KEY


const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/*",(req,res,next) => {
    const sk = req.query.secretkey
    if(!sk || sk!==secretKey)
        return res.status(401).json({statusCode:401,status:"Not Ok",message:"key not found or Invalid key"})
    next()
})

app.get("/api/",(req,res)=>res.status(200).json({statusCode:200,status:"Ok",message:"Api is working"}))

app.post("/api/register",registerMiddleware.allDetails,registerMiddleware.validDetails,registerMiddleware.userExists,register)
app.post("/api/login",loginMiddleware.allDetails,loginMiddleware.userNotExists,login)
app.put("/api/:userId/profile",settingsMiddleware.allDetails,settingsMiddleware.userNotExists,profileSettings)
app.put("/api/:userId/scans",settingsMiddleware.allDetails,settingsMiddleware.userNotExists,scansSettings)
app.put("/api/:userId/settings",settingsMiddleware.allDetails,settingsMiddleware.userNotExists,settingsSettings)

app.post("/api/:userId/nutrilization",nutrilizationMiddleware.allDetails,nutrilizationMiddleware.userNotExists,nutrilization)

//pending
app.post("/api/:userId/post",postMiddleware.allDetails,postMiddleware.userNotExists,postCreate)

app.listen(port,()=>console.log("Server is listening at port "+port))