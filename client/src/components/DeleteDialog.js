import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class DeleteDialog extends React.Component {
  render() {
    return (
      <div
        id="deleteRoundDialog"
        className="mode-page action-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roundFormHeader"
        tabIndex="0"
      >
        <h1 id="deleteRoundHeader" className="mode-page-header">
          Confirm Delete?
        </h1>
        <div className="mode-page-btn-container">
          <button
            id="deleteRoundBtn"
            onClick={() => {
              this.props.confirmDeleteRound();
              this.props.cancelDeleteRound();
            }}
            className="mode-page-btn action-dialog action-button"
          >
            {/* <FontAwesomeIcon icon="user-plus" /> */}
            &nbsp;Yes, Delete
          </button>
          <button
            type="button"
            className="mode-page-btn-cancel action-dialog cancel-button"
            onClick={() => {
              this.props.cancelDeleteRound();
            }}
          >
            {/* <FontAwesomeIcon icon="window-close" /> */}
            &nbsp;Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default DeleteDialog;
