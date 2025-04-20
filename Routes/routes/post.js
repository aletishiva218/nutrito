import {userModal,postModel} from "../../Database/Modal.js";
import mongoose from "mongoose";

const isValidUser = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  const user = await userModal.findById(id);
  return !!user;
};

const validateRequestBody = (fields) => (req, res, next) => {
  for (const field of fields) {
    if (!req.body[field]) {
      return res.status(400).json({ message: `${field} is required` });
    }
  }
  next();
};

const post = {
    create: async (req, res) => {
        try {
            const { user, content, image } = req.body;
            if (!(await isValidUser(user))) return res.status(400).json({statusCode:400, message: 'Invalid User ID' });
            const newPost = new postModel({ user, content, image });
            await newPost.save();
          res.status(201).json({statusCode:201,message:"Post created successfully",post:newPost});
        } catch (err) {
          res.status(500).json({statusCode:500,message:"Error while creating post",error:err.message});
        }
      },
      getAll:async (req, res) => {
        try {
            const posts = await postModel.find().populate('user','name').populate('comments.user', 'name').lean();
          res.status(200).json({statusCode:200,message:"Posts fetched successfully",posts:posts});
        } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while retrieving posts",error:err.message});
        }
      },
      get:async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({statusCode:400, message: 'Invalid Post ID' });
            const post = await postModel.findById(req.params.id).populate('user', 'name').populate('comments.user', 'name');
            if (!post) return res.status(404).json({statusCode:404, message: 'Post not found' });
          res.status(200).json({statusCode:200,message:"Post fetched successfully",post:post});
        } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while retrieving post",error:err.message});
        }
      },
      update: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id) || !(await isValidUser(req.body.user))) return res.status(400).json({statusCode:400, message: 'Invalid ID' });
            const post = await postModel.findById(req.params.id);
            if (!post) return res.status(404).json({ message: 'Post not found' });
            if (post.user.toString() !== req.body.user) return res.status(403).json({statusCode:403, message: 'Unauthorized' });
          const updatedPost = await postModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
          res.status(200).json({statusCode:200,message:"Post updated successfully",posts:updatedPost});
        } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while updating post",error:err.message});
        }
      },
      delete: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id) || !(await isValidUser(req.body.user)))return res.status(400).json({statusCode:400, message: 'Invalid ID' });
            const post = await postModel.findById(req.params.id);
            if (!post) return res.status(404).json({statusCode:404, message: 'Post not found' });
            if (post.user.toString() !== req.body.user) return res.status(403).json({ message: 'Unauthorized' });
            await postModel.findByIdAndDelete(req.params.id);
          res.status(200).json({statusCode:200,message:"Post deleted successfully"});
        } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while deleting post",error:err.message});
        }
      },
      like:async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id) || !(await isValidUser(req.body.user))) return res.status(400).json({statusCode:400, message: 'Invalid ID' });
            const post = await postModel.findById(req.params.id);
            if (!post) return res.status(404).json({statusCode:404, message: 'Post not found' });
            if (!post.likes.includes(req.body.user)) post.likes.push(req.body.user);
            await post.save();
          res.status(200).json({statusCode:200,message:"post liked successfully",post:post});
        } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while liking post",error:err.message});
        }
      },
      comment: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id) || !(await isValidUser(req.body.user))) return res.status(400).json({statusCode:400, message: 'Invalid ID' });
          const post = await postModel.findById(req.params.id);
          if (!post) return res.status(404).json({statusCode:404, message: 'Post not found' });
            post.comments.push({ user: req.body.user, text: req.body.text });
            await post.save();
          res.status(200).json({statusCode:200,message:"post commented successfully",post:post});
        } catch (err) {
          res.status(500).json({statusCode:500,message:"Error while commenting on post",error:err.message});
        }
      },
      favourite: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.id) || !(await isValidUser(req.body.user))) return res.status(400).json({statusCode:400, message: 'Invalid ID' });
            const post = await postModel.findById(req.params.id);
            if (!post) return res.status(404).json({statusCode:404, message: 'Post not found' });
            if (!post.favorites.includes(req.body.user)) post.favorites.push(req.body.user);
            await post.save();
            res.status(200).json({statusCode:200,message:"added in favourite category",post:post});
          } catch (err) {
            res.status(500).json({statusCode:500,message:"Error while adding into favourite category",error:err.message});
        }
      },
      getUserPosts: async (req, res) => {
        try {
          const userId = req.params.userId;
                if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ statusCode: 400, message: 'Invalid User ID' });
          }
          const posts = await postModel.find({ user: userId });
                if (posts.length === 0) {
            return res.status(404).json({ statusCode: 404, message: 'User ID not found or no posts available' });
          }
          res.status(200).json({ statusCode: 200, message: "User posts fetched successfully", post: posts });
        } catch (err) {
          res.status(500).json({ statusCode: 500, message: "Error while getting user posts", error: err.message });
        }
      },
      getUserLikedPosts: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.userId)) return res.status(400).json({statusCode:400, message: 'Invalid User ID' });
          const posts = await postModel.find({ likes: req.params.userId });
          res.status(200).json({statusCode:200,message:"user liked posts fetched successfully",post:posts});
        } catch (err) {
          res.status(500).json({statusCode:500,message:"Error while getting user liked posts",error:err.message});
        }
      },
      getUserFavouritePosts: async (req, res) => {
        try {
          if (!mongoose.Types.ObjectId.isValid(req.params.userId)) return res.status(400).json({statusCode:400,message: 'Invalid User ID' });
          const posts = await postModel.find({ favorites: req.params.userId });
          res.status(200).json({statusCode:200,message:"user favourite posts fetched successfully",post:posts});
        } catch (err) {
          res.status(500).json({statusCode:500,message:"Error while fetching user favourite posts",error:err.message});
        }
      }
}

export {post,validateRequestBody};

