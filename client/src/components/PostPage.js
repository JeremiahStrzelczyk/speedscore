import React from "react";

class PostPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedPostComment: "",
      feedPostPic: "",
    };
  }

  handleChange = (e) => {
    if (e.target.name === "feedPostPic") {
      if (e.target.value.length === 0) {
        this.setState({ feedPostPic: "" });
      } else {
        const self = this;
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.addEventListener("load", function () {
          self.setState({ feedPostPic: this.result });
        });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  savePost = async () => {
    // const res = await this.props.addFeedPost(
    await this.props.addFeedPost(
      Date.now(),
      this.state.feedPostPic,
      this.state.feedPostComment
    );
  };

  render() {
    return (
      <>
        <div
          id="feedModeDialog"
          className="post-mode-page action-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="newPostHeader"
          tabindex="0"
        >
          <h1 id="newPostHeader" className="post-mode-page-header">
            What's on your mind?
          </h1>
          <p className="post-mode-page-content">
            <form method="post">
              <textarea
                id="feedPost"
                name="feedPostComment"
                value={this.state.feedPostComment}
                onChange={this.handleChange}
                rows="4"
                cols="50"
                maxLength="100"
              ></textarea>
              <br></br>
              <span className="post-mode-below-textarea">
                Have a cool photo or video you want to share?
              </span>
              <br></br>

              <input
                id="feedPostPic"
                onChange={this.handleChange}
                name="feedPostPic"
                type="file"
                className="post-file"
                accept="image/png, image/jpeg, video/*, .png, .gif, .jpg"
              />
            </form>
          </p>

          <div className="post-mode-page-btn-container">
            <button
              id="feedModeActionBtn"
              className="mode-page-btn action-dialog action-button"
              type="button"
              onClick={() => {
                this.savePost();
                this.props.postSuccess();
              }}
            >
              Post to Feed
            </button>
            <button
              id="feedModePostCancelBtn"
              className="mode-page-btn-cancel action-dialog cancel-button"
              type="button"
              onClick={() => {
                this.props.cancelPost();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default PostPage;
