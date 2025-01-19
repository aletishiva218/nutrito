import {userModal} from "../../Database/Modal.js";
import dotenv from "dotenv";
dotenv.config()

const postCreate = async (req,res)=>{
    const {text} = req.body;
    const {userId} = req.params;
    const user = await userModal.findOne({userId,userId})
    let userPosts = user.social.posts;
    let newPost = {text:text,timestamp:timestamp,comments:[]}
    userPosts.push(newPost)
    await userModal.updateOne({userId:userId},{$set:{"social.posts":userPosts}})
 return res.status(200).json({statusCode:200,status:"Ok",message:"post created successfully"})
}

export default postCreate;