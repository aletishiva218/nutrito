import {userModal} from "../../Database/Modal.js";

const register = async (req,res) => {
    const {userId} = req.body;
   
    const user = await userModal.findOne({userId:userId})
    return res.status(200).json({statusCode:200,status:"Ok",message:"user login successfully",user:user})
}

export default register;