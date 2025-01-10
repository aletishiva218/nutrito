import express from "express"
import cors from "cors";

import register from "./Routes/routes/register.js";
import login from "./Routes/routes/login.js";

import registerMiddleware from "./Routes/middlewares/register.js";
import loginMiddleware from "./Routes/middlewares/login.js";


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
        return res.status(401).json({status:"Not Ok",message:"Invalid key user"})
    next()
})


app.get("/api/",(req,res)=>res.status(200).json({status:"Ok",message:"Api is working"}))

app.post("/api/register",registerMiddleware.allDetails,registerMiddleware.validDetails,registerMiddleware.userExists,register)
app.post("/api/login",loginMiddleware.allDetails,loginMiddleware.userNotExists,login)


app.listen(port,()=>console.log("Server is listening at port "+port))