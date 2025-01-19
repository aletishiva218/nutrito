import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const settingsSettings = async (req,res)=>{
    const {settings} = req.body;
    const {userId} = req.params;
    await userModal.updateOne({userId:userId},{$set:{"settings.settings":settings}})
 return res.status(200).json({statusCode:200,status:"Ok",message:"settings settings updated"})
}

export default settingsSettings;