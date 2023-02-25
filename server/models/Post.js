import mongoose from "mongoose";
import { CommentSchema } from "./Comment.js";

const PostSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  userData: {
    firstName: { type: String, required: true },
    userName: { type: String, required: true },
  },
  roundData: {
    sgs: { type: String },
    strokes: { type: String },
    minutes: { type: String },
    seconds: { type: String },
    isPrivate: { type: Boolean },
  },

  postData: {
    date: { type: String },
    fistBumpCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    comment: { type: String },
    postType: { type: String }, //post, round, error
  },
  comments: [CommentSchema],
});

const Post = mongoose.model("Post", PostSchema);
export { PostSchema, Post };
// export default Post;

/*****************************************************************


To check if the post belongs to a BUDDY
    Update User Schema, CreateAccount, ... to include a hard-coded array of userIds
    On client-side, For each B in Buddy array
        If Post.userId matches a buddy then we have a match
    

When user submits Post button
    Save to DB

 *****************************************************************/
