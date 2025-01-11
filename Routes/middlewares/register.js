import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()


const registerMiddleware = {
    allDetails:(req,res,next) => {
        const userId = req.body.userId;
        const email = req.body.email;
        if(!userId || !email)
            return res.status(404).json({statusCode:404,status:"Not Ok",message:"userId or email is missing"})
        next()
    },
    validDetails:(req,res,next) => {
        const email = req.body.email;
        const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if(!isValidEmail(email))
            return res.status(409).json({statusCode:409,status:"Not Ok",message:"Invalid Email"})
        next()
    },
    userExists:async (req,res,next) => {
        const userId = req.body.userId;
        const existUser = await userModal.findOne({userId:userId})
        if(existUser)
            return res.status(409).json({statusCode:409,status:"Not Ok",message:"user ID already exists"})
        next()
    }
}

export default registerMiddleware;