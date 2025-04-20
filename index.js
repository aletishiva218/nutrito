import express from "express"
import cors from "cors";

import register from "./Routes/routes/register.js";
import login from "./Routes/routes/login.js";
import profileSettings from "./Routes/routes/profileSettings.js";
import scansSettings from "./Routes/routes/scansSettings.js";
import settingsSettings from "./Routes/routes/settingsSettings.js";
import nutrilization from "./Routes/routes/nutrilization.js";
import alternativeProducts from "./Routes/routes/alternativeProducts.js";
import {post,validateRequestBody} from "./Routes/routes/post.js";

import registerMiddleware from "./Routes/middlewares/register.js";
import loginMiddleware from "./Routes/middlewares/login.js";
import settingsMiddleware from "./Routes/middlewares/settings.js";
import nutrilizationMiddleware from "./Routes/middlewares/nutrilization.js";
import alternativeProductsMiddleware from "./Routes/middlewares/alternativeProducts.js";


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

app.get("/api/alternativeproducts",alternativeProducts.get)
app.get("/api/products/search",alternativeProductsMiddleware.search,alternativeProducts.search)
app.patch("/api/alternativeproducts",alternativeProductsMiddleware.areProducts,alternativeProductsMiddleware.isCorrectArray,alternativeProducts.add)

app.post("/api/post",validateRequestBody(['user', 'content']),post.create)
app.get("/api/posts",post.getAll)
app.get("/api/post/:id",post.get)
app.put("/api/post/:id",validateRequestBody(['user', 'content']),post.update)
app.delete("/api/post/:id",validateRequestBody(['user']),post.delete)
app.post("/api/post/:id/like",validateRequestBody(['user']),post.like)
app.post("/api/post/:id/comment",validateRequestBody(['user', 'text']),post.comment)
app.post("/api/post/:id/favourite",validateRequestBody(['user']),post.favourite)
app.get("/api/user/:userId/posts",post.getUserPosts)
app.get("/api/user/:userId/posts/liked",post.getUserLikedPosts)
app.get("/api/user/:userId/posts/favourites",post.getUserFavouritePosts)


app.listen(port,()=>console.log("Server is listening at port "+port))