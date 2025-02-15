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
   image_url:{type:String,required:true}
},{minimize:false})



const userModal = new mongoose.model("users",userSchema)
const nutrilizationModel = new mongoose.model("nutrilization",nutrilizationSchema)
const alternativeProductModel = new mongoose.model("alternative",alternativeProductSchema)

export {userModal,nutrilizationModel,alternativeProductModel};