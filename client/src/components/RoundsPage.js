import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundsMode from "./RoundsMode.js";
import RoundsTable from "./RoundsTable.js";
import RoundForm from "./RoundForm.js";
import FloatingButton from "./FloatingButton.js";
import DeleteDialog from "./DeleteDialog.js";
import EarnBadges from "./EarnBadges.js";
import EarnBadgesBtn from "./EarnBadgesBtn.js";

class RoundsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: RoundsMode.ROUNDSTABLE,
      deleteId: -1,
      editId: -1,
      deleteDialogOpen: false,
      earnBadgesOpen: false,
      newBadgeToastOpen: false,
      newBadgeToast: false,
    };
  }

  setMode = (newMode) => {
    this.setState({ mode: newMode });
  };

  initiateEditRound = (val) => {
    this.setState(
      { editId: val, mode: RoundsMode.EDITROUND },
      this.props.toggleModalOpen
    );
  };

  initiateDeleteRound = (val) => {
    this.setState({ deleteId: val, deleteDialogOpen: true });
    this.props.toggleModalOpen();
  };

  cancelDeleteRound = () => {
    this.setState({
      deleteDialogOpen: false,
    });
    this.props.toggleModalOpen();
  };

  backBtn = () => {
    this.props.toggleModalOpen();

    this.setState({
      earnBadgesOpen: false,
    });
  };
  confirmDeleteRound = async () => {
    // await this.props.deleteRound(this.state.deleteId);
    await this.props.deleteRound(this.state.deleteId);
  };

  toggleRenderNewBadgeToast = () => {
    this.setState((prevState) => ({ newBadgeToast: !prevState.newBadgeToast }));
  };

  render() {
    if (this.state.deleteDialogOpen) {
      return (
        <>
          <div className="space">
            <DeleteDialog
              confirmDeleteRound={this.confirmDeleteRound}
              cancelDeleteRound={this.cancelDeleteRound}
              deleteDialogOpen={this.deleteDialogOpen}
              deleteId={this.state.deleteId}
            />
          </div>
        </>
      );
    }

    if (this.state.earnBadgesOpen) {
      return (
        <>
          <div className="space">
            <EarnBadges cancelBtn={this.backBtn} />
          </div>
        </>
      );
    }
    switch (this.state.mode) {
      case RoundsMode.ROUNDSTABLE:
        return (
          <>
            <RoundsTable
              newBadgeToast={this.state.newBadgeToast}
              rounds={this.props.rounds}
              initiateDeleteRound={this.initiateDeleteRound}
              deleteRound={this.props.deleteRound}
              deleteId={this.state.deleteId}
              initiateEditRound={this.initiateEditRound}
              updateRound={this.props.updateRound}
              setMode={this.setMode}
              toggleModalOpen={this.props.toggleModalOpen}
              menuOpen={this.props.menuOpen}
              newBadgeToastOpen={this.state.newBadgeToastOpen}
              toggleRenderNewBadgeToast={this.toggleRenderNewBadgeToast}
            />
            <FloatingButton
              icon="calendar"
              label={"Log Round"}
              menuOpen={this.props.menuOpen}
              action={() =>
                this.setState(
                  { mode: RoundsMode.LOGROUND, newBadgeToast: false },
                  this.props.toggleModalOpen
                )
              }
            />
            <br />
            <EarnBadgesBtn
              icon="medal"
              label={"Earn badges"}
              action={() => {
                this.props.toggleModalOpen();
                this.setState({
                  earnBadgesOpen: true,
                });
              }}
            />
            {this.state.earnBadgesOpen ? <EarnBadges /> : null}
            {this.state.deleteDialogOpen ? (
              <DeleteDialog
                deleteRound={this.props.deleteRound}
                deleteDialogOpen={this.deleteDialogOpen}
                deleteId={this.state.deleteId}
              />
            ) : null}
          </>
        );
      case RoundsMode.LOGROUND:
        return (
          <RoundForm
            numRounds={this.props.numRounds}
            badges={this.props.badges}
            mode={this.state.mode}
            roundData={null}
            saveRound={this.props.addRound}
            incrementRounds={this.props.incrementRounds}
            toggleModalOpen={this.props.toggleModalOpen}
            setMode={this.setMode}
            updateBadges={this.props.updateBadges}
            toggleRenderNewBadgeToast={this.toggleRenderNewBadgeToast}
          />
        );
      case RoundsMode.EDITROUND:
        return (
          <RoundForm
            numRounds={this.props.numRounds}
            // currentScore={this.props.currentScore}
            badges={this.props.badges}
            mode={this.state.mode}
            editId={this.state.editId}
            roundData={this.props.rounds[this.state.editId]}
            saveRound={this.props.updateRound}
            toggleModalOpen={this.props.toggleModalOpen}
            setMode={this.setMode}
            updateBadges={this.props.updateBadges}
            toggleRenderNewBadgeToast={this.toggleRenderNewBadgeToast}
          />
        );
      default:
        console.log("RoundsPage: Default case in switch");
    }
  }
}

export default RoundsPage;
