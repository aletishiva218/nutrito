import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const goalsSettings = async (req,res)=>{
    const {goals} = req.body;
    const {userId} = req.params;
    await userModal.updateOne({userId:userId},{$set:{"settings.goals":goals}})
 return res.status(200).json({statusCode:200,status:"Ok",message:"goals settings updated"})
}

export default goalsSettings;