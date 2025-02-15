import {alternativeProductModel} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const alternativeProducts = {
    get:async (req,res) => {
        const products = await alternativeProductModel.find({})
        return res.status(200).json({statusCode:200,status:"Ok",message:"alternative products fetched successfully",products:products})
    },
    add:async (req,res) => {
        const {alternativeProducts} = req.body;

        await alternativeProductModel.insertMany(alternativeProducts)

        return res.status(200).json({statusCode:200,status:"Ok",message:"products added in alternative products"})
    }
}

export default alternativeProducts;