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
    },
    search:async (req,res) => {
        let products = await alternativeProductModel.find({})
        products = products.map(product=>{
            return {
                name:product.name,
   description:product.description,
   health_benefits:product.health_benefits,
   common_uses:product.common_uses,
   image_url:product.image_url,
   company_name:product.company_name,
   price:product.price,
   qty:product.qty
            }
        })
        const query = req.query.q ? req.query.q.toLowerCase() : "";
        const filteredProducts = products.filter(product => {
            return Object.values(product).some(value => {
                if (typeof value === "string") {
                    return value.toLowerCase().includes(query);
                } else if (Array.isArray(value)) {
                    return value.some(item => item.toLowerCase().includes(query));
                } else if (typeof value === "number") {
                    return value.toString().includes(query); // Check if number matches query
                }
                return false;
            });
        });
    

        if(filteredProducts.length>0)
        return res.status(200).json({statusCode:200,status:"Ok",message:"Match Found",products:filteredProducts})
    else
        return res.status(200).json({statusCode:200,status:"Not Ok",message:"Match not Found",products:filteredProducts})
    },
}

export default alternativeProducts;