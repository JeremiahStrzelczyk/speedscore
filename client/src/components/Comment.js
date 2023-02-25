import React from "react";
// import logo from "../images/sslogo2.png";
import Card from "react-bootstrap/Card";

class CommentPage extends React.Component {
  render() {
    const { user, comment, date } = this.props;
    return (
      <Card id="feedCommentCard" className="text-left mb-3 centered w-100">
        {/* <Card.Header>User</Card.Header> */}
        <Card.Header className="mb-3 centered w-100">{user}</Card.Header>
        <Card.Body>
          {/* <Card.Title>{user}</Card.Title> */}
          <Card.Text className="h4">{comment}</Card.Text>
          {/* <Card.Text>Hello There</Card.Text> */}
          <Card.Text>{date}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        {/* <Card.Footer>Footer</Card.Footer> */}
      </Card>
    );
  }
}

export default CommentPage;
