import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const nutrilizationMiddleware = {
    allDetails:(req,res,next) => {
        const userId = req.params.userId;
        const {data} = req.body;
        if(!userId)
            return res.status(404).json({statusCode:404,status:"Not Ok",message:"userId is missing"})
        if(!data)
            return res.status(404).json({statusCode:404,status:"Not Ok",message:"nutrilization data is missing"})
        next()
    },
    userNotExists:async (req,res,next) => {
        const userId = req.params.userId;
        const existUser = await userModal.findOne({userId:userId})
        if(!existUser)
            return res.status(409).json({statusCode:409,status:"Not Ok",message:"user ID does not exists"})
        next()
    }
}

export default nutrilizationMiddleware;