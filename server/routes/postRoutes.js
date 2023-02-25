import { Post } from "../models/Post.js";
import express from "express";
const postRoute = express.Router();

/*****************************************************************
 * Used to get the first element in the Posts database
 *****************************************************************/
postRoute.get("/posts/:postId", async (req, res, next) => {
  // console.log(
  //   "In /posts route (GET) with postId = " + JSON.stringify(req.params.postId)
  // );

  try {
    const PostCursor = await Post.findOne({ _id: req.params.postId });

    const prev = await Post.find({
      _id: { $lt: PostCursor._id },
    }).sort({ _id: -1 });
    // .limit(1);

    res.status(200).json(prev);
    // res.status(200).json(prev[0]); //Only passes first obj
  } catch {}
});

postRoute.post("/posts/:postId", async (req, res) => {
  //Print log
  // console.log(
  //   "In /posts (POST) route with params = " +
  //     JSON.stringify(req.params) +
  //     " and body = " +
  //     JSON.stringify(req.body)
  // );

  //Verify data
  const validUserProps = ["firstName", "userName"];
  const validRoundProps = ["sgs", "strokes", "minutes", "seconds", "isPrivate"];
  const validPostProps = [
    "date",
    "fistBumpCount",
    "commentCount",
    "comment",
    "postType",
  ];

  for (const bodyProp in req.body) {
    if (bodyProp === "_id") {
    } else if (bodyProp === "comments") {
    } else if (bodyProp === "userData") {
      for (const uProp in req.body.userData) {
        if (!validUserProps.includes(uProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in userData: " +
                "'firstName', userName'"
            );
        }
      }
    } else if (bodyProp === "roundData") {
      for (const rProp in req.body.roundData) {
        if (!validRoundProps.includes(rProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in roundData: " +
                "'sgs', strokes', minutes', seconds'"
            );
        }
      }
    } else if (bodyProp === "postData") {
      for (const pProp in req.body.postData) {
        if (!validPostProps.includes(pProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in postData: " +
                "'date', fistBumpCount', commentCount', postType'"
            );
        }
      }
    } else {
      return res
        .status(400)
        .send(
          "posts/ POST request incorrectly formatted." +
            "Only the following props are allowed for postData: " +
            "'userData', 'roundData', postData'"
        );
    }
  }

  //Try to save data
  try {
    let thisPost = await new Post(req.body).save();
    return res
      .status(201)
      .send("New post for'" + req.params.postId + "' successfully created");
  } catch (err) {
    return res
      .status(400)
      .send("Unexpected error occurred while adding Post to database. " + err);
  }
});

/*****************************************************************
 * UPDATE post route
 *****************************************************************/
postRoute.put("/posts/:postId", async (req, res) => {
  //Print log
  // console.log(
  //   "In /posts (PUT) route with params = " +
  //     JSON.stringify(req.params) +
  //     " and body = " +
  //     JSON.stringify(req.body)
  // );

  //Verify data
  const validUserProps = ["firstName", "userName"];
  const validRoundProps = ["sgs", "strokes", "minutes", "seconds", "isPrivate"];
  const validPostProps = [
    "date",
    "fistBumpCount",
    "commentCount",
    "comment",
    "postType",
  ];

  for (const bodyProp in req.body) {
    if (bodyProp === "_id") {
    } else if (bodyProp === "comments") {
    } else if (bodyProp === "__v") {
    } else if (bodyProp === "userData") {
      for (const uProp in req.body.userData) {
        if (!validUserProps.includes(uProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in userData: " +
                "'firstName', userName'"
            );
        }
      }
    } else if (bodyProp === "roundData") {
      for (const rProp in req.body.roundData) {
        if (!validRoundProps.includes(rProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in roundData: " +
                "'sgs', strokes', minutes', seconds', isPrivate"
            );
        }
      }
    } else if (bodyProp === "postData") {
      for (const pProp in req.body.postData) {
        if (!validPostProps.includes(pProp)) {
          return res
            .status(400)
            .send(
              "posts/ POST request formatted incorrectly." +
                "Only the following props are allowed in postData: " +
                "'date', fistBumpCount', commentCount', postType'"
            );
        }
      }
    } else {
      return res
        .status(400)
        .send(
          "posts/ POST request incorrectly formatted." +
            "Only the following props are allowed for postData: " +
            "'userData', 'roundData', postData'"
        );
    }
  }
  try {
    const newFistBumpCount = req.body.postData.fistBumpCount;
    const status = await Post.updateOne(
      { _id: req.params.postId },
      // { $set: { "postData.fistBumpCount": newFistBumpCount } }
      { $set: req.body }
    );
    if (status.modifiedCount != 1) {
      //Post not found
      res
        .status(404)
        .send(
          "Post not updated. Either no post with that ID or no value changed."
        );
    } else {
      return res
        .status(201)
        .send("New post for'" + req.params.postId + "' successfully created");
    }
  } catch (err) {
    return res
      .status(400)
      .send("Unexpected error occurred while adding Post to database. " + err);
  }
});

export default postRoute;
