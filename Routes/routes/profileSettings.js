import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const profileSettings = async (req,res)=>{
    const {profile} = req.body;
    const {userId} = req.params;
    await userModal.updateOne({userId:userId},{$set:{"settings.profile":profile}})
 return res.status(200).json({statusCode:200,status:"Ok",message:"profile settings updated"})
}

export default profileSettings;