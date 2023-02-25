import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  _id: { type: Number },
  username: { type: String },
  comment: { type: String },
  date: { type: String },
  time: { type: String },
});

const Comment = mongoose.model("Comment", CommentSchema);
export { CommentSchema, Comment };
