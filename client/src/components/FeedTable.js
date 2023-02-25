import React from "react";
import PostButton from "./PostButton";
import FeedMode from "./FeedMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import FeedPost from "./FeedPost";

class FeedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: "",
      statusIcon: this.props.statusIcon,
      // table: [],
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevState, thisState) {
    if (this.props.statusIcon === "spinner") {
      // this.props.resetIcon();
    }
    // if (this.props.update) {
    //   this.buildTable();
    //   this.props.toggleUpdate();
    // }
  }

  renderTable = () => {
    return this.props.table;
  };

  render() {
    return (
      <div
        id="feedTableTab"
        className="mode-page"
        role="tabpanel"
        aria-label="Feed Table Tab"
        tabIndex="0"
      >
        <h1 className="mode-page-header">Feed Mode</h1>

        <h3 style={{ align: "left" }}>
          {this.props.statusIcon === "spinner" ? "Updating" : "Updated"}:{" "}
          <FontAwesomeIcon
            icon={this.props.statusIcon}
            className={
              this.props.statusIcon === "spinner"
                ? "fa-spin text-danger"
                : "text-success"
            }
          />
        </h3>
        <table
          id="feedTable"
          className="table table-hover table-striped caption-top"
        >
          <caption id="feedTableCaption" aria-live="polite"></caption>
          <tbody>
            {this.props.objs === null || this.props.objs.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <i>Feed unable to load</i>
                </td>
              </tr>
            ) : (
              this.renderTable()
            )}
          </tbody>
        </table>

        <PostButton
          icon="blog"
          label={"Post"}
          action={() => {
            this.props.setMode(FeedMode.FEEDPOST);
          }}
        />
      </div>
    );
  }
}

export default FeedTable;
