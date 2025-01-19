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

const userModal = new mongoose.model("users",userSchema)
const nutrilizationModel = new mongoose.model("nutrilization",nutrilizationSchema)

export {userModal,nutrilizationModel};