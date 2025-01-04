import mongoose from "./Config.js";

const userSchema = mongoose.Schema({
   userId:String,
   settings:Object
})

const userModal = new mongoose.model("users",userSchema)

export {userModal};