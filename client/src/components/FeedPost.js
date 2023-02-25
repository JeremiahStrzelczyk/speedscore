import React from "react";
import Card from "react-bootstrap/Card";
import profilePic from "../images/DefaultProfilePic.jpg";
import LikeImage from "../images/like.png";
import CommentImage from "../images/comment.png";

class FeedPost extends React.Component {
  render() {
    const { pic, title, likeCount, comment } = this.props;
    return (
      <Card id="feedPostCard" className="text-left mb-3 centered w-100">
        <Card.Img
          variant="left"
          src={pic === "" ? profilePic : pic}
          width="50"
          height="50"
        />
        <Card.Title>{title}</Card.Title>
        <Card.Body
          onClick={() => {
            this.props.handleTableClick(this.props.r);
          }}
          className="h5"
        >
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text id="feedPostLikes" className="h3">
            <img
              alt="Like a post"
              id="feedPostLikeImg"
              onClick={() => {
                this.props.handleLikeClick(this.props.r);
              }}
              width="40px"
              height="40px"
              src={LikeImage}
            />{" "}
            {likeCount}
          </Card.Text>
          <Card.Text className="h3">
            <img
              alt="Comment"
              id="feedPostCommentImg"
              onClick={() => {
                this.props.handleTableClick(this.props.r);
              }}
              width="40px"
              height="40px"
              src={CommentImage}
            />{" "}
            {/* {commentCount} */}
          </Card.Text>
        </Card.Footer>
      </Card>
    );
  }
}

export default FeedPost;
