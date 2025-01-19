import {nutrilizationModel} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const nutrilization = async (req,res) =>{
    const {userId} = req.params;
    const {data} = req.body;
    let nutrilizationData = await nutrilizationModel.findOne({userId:userId})
    nutrilizationData = nutrilizationData.data;
    nutrilizationData.unshift(data)
    await nutrilizationModel.updateOne({userId:userId},{data:nutrilizationData})
    return res.status(200).json({statusCode:200,status:"Ok",message:"nutrilization data added"})
}

export default nutrilization;