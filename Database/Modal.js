import mongoose from "./Config.js";

const userSchema = mongoose.Schema({
   userId:String,
   user:Object,
   timestamp:String
})

const userModal = new mongoose.model("users",userSchema)

export {userModal};