import mongoose from "./Config.js";

const userSchema = mongoose.Schema({
   userId:String,
   home:Object,
   social:Object,
   settings:Object,
   timestamp:String
},{minimize:false})

const userModal = new mongoose.model("users",userSchema)

export {userModal};