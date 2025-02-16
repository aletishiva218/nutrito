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
    search:async (req,res,next) => {
        const query = req.query.q ? req.query.q.toLowerCase() : "";

    if (!query) {
        return res.status(400).json({statusCode:400,status:"Not Ok",message: "Query parameter 'q' is required." });
    }
    next()
    },
}

export default alternativeProductsMiddleware;