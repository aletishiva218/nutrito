import mongoose from "./Config.js";

const userSchema = mongoose.Schema({
   userId:String,
   home:Object,
   social:Object,
   settings:Object,
   timestamp:String
},{minimize:false})

const nutrilizationSchema = mongoose.Schema({
   userId:String,
   email:String,
   data:Array
},{minimize:false})

const alternativeProductSchema = mongoose.Schema({
   name:{type:String,required:true},
   description:{type:String,required:true},
   health_benefits:{type:Array,required:true},
   common_uses:{type:Array,required:true},
   image_url:{type:String,required:true},
   company_name:{type:String,required:true},
   price:{type:Number,required:true},
   qty:{type:String,required:true}
},{minimize:false})

const postSchema = new mongoose.Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
   content: { type: String, required: true },
   image: { type: String }, // Store image URL
   likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
   comments: [{
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
     text: { type: String, required: true },
     createdAt: { type: Date, default: Date.now }
   }],
   createdAt: { type: Date, default: Date.now }
 });

const userModal = new mongoose.model("users",userSchema)
const nutrilizationModel = new mongoose.model("nutrilization",nutrilizationSchema)
const alternativeProductModel = new mongoose.model("alternative_products",alternativeProductSchema)
const postModel = new mongoose.model("posts",postSchema)


export {userModal,nutrilizationModel,alternativeProductModel,postModel};