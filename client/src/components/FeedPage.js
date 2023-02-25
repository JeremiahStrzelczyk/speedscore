import React from "react";
// import logo from "../images/sslogo2.png";
import PostPage from "./PostPage";
import FeedTable from "./FeedTable";
import FeedMode from "./FeedMode.js";
import PopUpModal from "./PopUpModal";
import FeedPost from "./FeedPost";

import baseURL from "../app/api/apiSlice";
class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: FeedMode.FEEDTABLE,
      objs: null,
      headId: 9999999999999,
      postId: -1,
      firstName: "",
      sgs: "",
      minutes: "",
      seconds: "",
      strokes: "",
      type: "",
      comments: [],
      likes: 0,
      commentCount: 0,
      comment: "",
      update: false,
      table: [],
      commentTitle: "",
      commentBody: "",
      statusIcon: "spinner",
    };
  }

  successBtn = () => {
    this.setState({
      update: true,
      statusIcon: "spinner",
    });
    this.setMode(FeedMode.FEEDTABLE);
  };

  resetIcon = () => {
    this.setState({
      statusIcon: "check",
    });
  };

  toggleUpdate = () => {
    this.setState({
      update: false,
    });
  };

  cancelBtn = () => {
    this.setMode(FeedMode.FEEDTABLE);
    this.setState({
      update: true,
    });
  };

  setMode = (newMode) => {
    this.setState({
      mode: newMode,
    });
    this.props.toggleModalOpen();
  };

  async componentDidMount() {
    const url = baseURL + "/posts/" + this.state.headId;
    // this.setState({ statusIcon: "spinner" });

    // let res = await fetch(url);
    await fetch(url)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          objs: obj,
        });
      });
    this.buildTable();
  }

  async componentDidUpdate() {
    if (this.state.update) {
      const url = baseURL + "/posts/" + this.state.headId;

      // let res = await fetch(url);
      await fetch(url)
        .then((response) => response.json())
        .then((obj) => {
          this.setState({
            objs: obj,
            update: false,
          });
        });
      this.buildTable();
    }
  }

  buildTable = async () => {
    const table = [];
    for (let r = 0; r < this.state.objs.length; ++r) {
      if (this.hasBuddy(this.state.objs[r].userData.userName)) {
        const userData = this.state.objs[r].userData;
        const roundData = this.state.objs[r].roundData;
        const postData = this.state.objs[r].postData;

        let date = postData.date;

        let name;
        let title;

        if (userData.userName === this.props.userId) name = "You";
        else name = userData.firstName;

        if (postData.postType === "round") {
          //For round
          title =
            name +
            " logged a speedgolf round. " +
            roundData.sgs +
            " (" +
            roundData.strokes +
            " in " +
            roundData.minutes +
            ":" +
            roundData.seconds +
            ") on " +
            date;
        } else if (postData.postType === "post") {
          title = name + " wrote a post on " + postData.date + ".";
        } else alert("Error");

        if (!roundData.isPrivate) {
          await this.getProfilePic(userData.userName);
          const pic = this.state.profilePic;

          table.push(
            <tr key={r}>
              <td>
                <FeedPost
                  r={r}
                  title={title}
                  pic={pic}
                  likeCount={postData.fistBumpCount}
                  commentCount={postData.commentCount}
                  comment={postData.comment}
                  handleLikeClick={this.handleLikeClick}
                  handleTableClick={this.handleTableClick}
                />
              </td>
            </tr>
          );
        }
      }
    } //for
    this.setState({
      statusIcon: "check",
      table: table,
    });
  };

  hasBuddy = (poster) => {
    if (poster === this.props.userId) return true;
    for (let bIndex = 0; bIndex < this.props.buddies.length; bIndex++) {
      if (this.props.buddies[bIndex] === poster) return true;
    }
    return false;
  };

  handleTableClick = (r) => {
    const userData = this.state.objs[r].userData;
    const roundData = this.state.objs[r].roundData;

    const commentList = this.state.objs[r].comments;
    const postData = this.state.objs[r].postData;

    let title;
    let body;

    //Derek logged a speedgolf round on DATE!
    //Derek scored a SGS by finishing with 80 strokes in 48:89
    if (postData.postType === "round") {
      title =
        userData.firstName +
        " logged a speedgolf round on " +
        postData.date +
        "!";

      body =
        userData.firstName +
        " scored a " +
        roundData.sgs +
        " by finishing with " +
        roundData.strokes +
        " strokes in " +
        roundData.minutes +
        ":" +
        roundData.seconds;
    } else if (postData.postType === "post") {
      //Derek created a post on DATE!
      //Body
      title = userData.firstName + " created a post on " + postData.date + "!";
      body = postData.comment;
    } else {
      console.log("FeedPage: Unexpected branch");
    }

    this.setState({
      mode: FeedMode.FEEDCOMMENT,
      firstName: userData.firstName,
      postId: this.state.objs[r]._id,
      commentCount: postData.commentCount,
      comments: commentList,
      commentTitle: title,
      commentBody: body,
      statusIcon: "spinner",
    });
    this.props.toggleModalOpen();
  };

  handleLikeClick = async (r) => {
    //Trying new way
    const updatedPost = this.state.objs[r];
    updatedPost.postData.fistBumpCount++;
    const updateId = this.state.objs[r]._id;
    // const res = await this.props.updatePost(updatedPost, updateId);
    await this.props.updatePost(updatedPost, updateId);
    this.setState({
      update: true,
      statusIcon: "spinner",
    });
  };

  /*****************************************************************
   * Receives the userId from the specific Feed Post.
   * We then fetch the user object based in the userId,
   * Currently, the get route returns a string back, so we have to
   * parse it first before using
   ***************************************************************** */
  getProfilePic = async (userId) => {
    const url = baseURL + "/users/" + userId;

    // let res = await fetch(url);
    await fetch(url)
      .then((response) => response.json())
      .then((user) => {
        let userObj = JSON.parse(user); //Turn string back into Object
        this.setState({
          profilePic: userObj.identityData.profilePic,
        });
      });
  };

  render() {
    switch (this.state.mode) {
      case FeedMode.FEEDTABLE:
        return (
          <div
            id="feedModeTab"
            className="mode-page"
            role="tabpanel"
            aria-label="Feed Tab"
            tabIndex="0"
          >
            {this.state.objs !== null ? (
              <FeedTable
                update={this.state.update}
                setMode={this.setMode}
                userId={this.props.userId}
                buddies={this.props.buddies}
                objs={this.state.objs}
                profilePic={this.props.profilePic}
                toggleUpdate={this.toggleUpdate}
                table={this.state.table}
                statusIcon={this.state.statusIcon}
                resetIcon={this.resetIcon}
              />
            ) : null}
          </div>
        );
      case FeedMode.FEEDPOST:
        return (
          <>
            <div className="space">
              <PostPage
                postComment={this.props.postComment}
                postSuccess={this.successBtn}
                addFeedPost={this.props.addFeedPost}
                cancelPost={this.cancelBtn}
              />
            </div>
          </>
        );

      case FeedMode.FEEDCOMMENT:
        return (
          <PopUpModal
            userId={this.props.userId}
            cancelComment={this.cancelBtn}
            postComment={this.props.postComment}
            firstName={this.state.firstName}
            strokes={this.state.strokes}
            minutes={this.state.minutes}
            seconds={this.state.seconds}
            sgs={this.state.sgs}
            postId={this.state.postId}
            comments={this.state.comments}
            likes={this.state.likes}
            commentCount={this.state.commentCount}
            title={this.state.commentTitle}
            body={this.state.commentBody}
          />
        );
      default:
        return (
          <h1 className="danger">
            Error. This branch should not have executed
          </h1>
        );
    } //end switch
  } //render
} //class

export default FeedPage;
