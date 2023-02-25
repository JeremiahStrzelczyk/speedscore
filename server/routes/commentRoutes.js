import { Comment } from "../models/Comment.js";
import express from "express";
import { Post } from "../models/Post.js";
const commentRoute = express.Router();

//CREATE comment route: Adds a new comment as a subdocument to
//a document in the users collection (POST)
commentRoute.post("/comments/:postId", async (req, res, next) => {
  // console.log(
  //   "in /comments (POST) route with params = " +
  //     JSON.stringify(req.params) +
  //     " and body = " +
  //     JSON.stringify(req.body)
  // );

  if (
    !req.body.hasOwnProperty("username") ||
    !req.body.hasOwnProperty("comment") ||
    !req.body.hasOwnProperty("date") ||
    !req.body.hasOwnProperty("time")
  ) {
    //Body does not contain correct properties
    return res
      .status(400)
      .send(
        "POST request on /comments formulated incorrectly." +
          "Body must contain all 8 required fields: date, course, type, holes, strokes, " +
          "minutes, seconds, notes."
      );
  }
  try {
    const comment = new Comment(req.body);
    const error = comment.validateSync();
    if (error) {
      //Schema validation error occurred
      return res
        .status(400)
        .send("Comment not added to database. " + error.message);
    }
    const status = await Post.updateOne(
      { _id: req.params.postId },
      { $push: { comments: req.body } }
    );
    if (status.modifiedCount != 1) {
      return res
        .status(400)
        .send(
          "Comment not added to database. " +
            "Post '" +
            req.params.postId +
            "' does not exist."
        );
    } else {
      return res.status(201).send("Comment successfully added to database.");
    }
  } catch (err) {
    return res
      .status(400)
      .send(
        "Comment not added to database. " + "Unexpected error occurred: " + err
      );
  }
});

export default commentRoute;
