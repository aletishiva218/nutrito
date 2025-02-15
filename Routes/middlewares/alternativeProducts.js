import dotenv from "dotenv";
dotenv.config()

const alternativeProductsMiddleware  =  {
    areProducts:async (req,res,next) => {
        const {alternativeProducts} = req.body;
        if(!alternativeProducts)
            return res.status(400).json({statusCode:400,status:"Not Ok",message:"alternative products are required"})
        next() 
    },
    isCorrectArray: async (req,res,next) => {
        const {alternativeProducts} = req.body;
        if(!Array.isArray(alternativeProducts))
            return res.status(400).json({statusCode:400,status:"Not Ok",message:"incorrect array format"})
        next() 
    },
    // isCorrectProduct: async (req,res,next) => {
    //     const {alternativeProducts} = req.body;
    //     var correct = true
    //     var message = ""
    //     var obj={}
    //     const isJsonObject = val => { try { const obj = typeof val === "string" ? JSON.parse(val) : val; return obj && typeof obj === "object" && !Array.isArray(obj); } catch { return false; } };
    //     for(i=0;i<alternativeProducts.length;i++)
    //     {
    //         if(!isJsonObject(alternativeProducts[i]))
    //         {
    //             correct = false;
    //             message="invalid object in array"
    //             obj=alternativeProducts[i]
    //             break
    //         }
    //         if(!(alternativeProducts[i].name && alternativeProducts[i].description && alternativeProducts[i].health_benefits && alternativeProducts[i].common_uses && alternativeProducts[i].image_url))
    //         {
    //             correct=false
    //             message="key is missing in any in the object"
    //             obj = alternativeProducts[i]
    //             break
    //         }
    //         if(!(typeof alternativeProducts[i].name=="string" && typeof alternativeProducts[i].description=="string" && Array.isArray(alternativeProducts[i].health_benefits) && Array.isArray(alternativeProducts[i].common_uses) && typeof alternativeProducts[i].image_url=="string"))
    //         {
    //             correct = false
    //             message="incorrect data type value in object"
    //             obj = alternativeProducts[i]
    //             break
    //         }
    //     }
    //     if(!correct)
    //         return res.status(400).json({statusCode:400,status:"Not Ok",message:message,object:obj})
    //     next() 
    // },
}

export default alternativeProductsMiddleware;