import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const scansSettings = async (req,res)=>{
    const {scans} = req.body;
    const {userId} = req.params;
    await userModal.updateOne({userId:userId},{$set:{"settings.scans":scans}})
 return res.status(200).json({statusCode:200,status:"Ok",message:"scans settings updated"})
}

export default scansSettings;