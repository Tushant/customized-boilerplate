import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import { confirmUserRequestBasic } from './actions';
import { Modal } from "react-bootstrap";
import { confirmUserRequest } from './actions';
import { showDialog } from "containers/App/actions";
import { selectConfirmUserRequest } from './selectors';

const mapStateToProps = createStructuredSelector({
  confirmUserRequest: selectConfirmUserRequest()
});

function mapDispatchToProps (dispatch) {
  return {
    hideDialog: () => dispatch(showDialog("null")),
    confirmUser: (userId) => dispatch(confirmUserRequest(userId)),
    // confirmUserBasic: (userId) => dispatch(confirmUserRequestBasic(userId))
  }

}

class ConfirmUser extends React.Component {

  componentDidMount() {
    const userid = this.props.match.params.userid;
    let success = this.props.confirmUser(userid);
    console.log("success", success);
  }


  render() {
    console.log("render", this.props.confirmUserRequest);
    const { confirmUserRequest } = this.props;
    return (
      <Modal className="modal-sm" show onHide={() => this.props.hideDialog()}>
        <Modal.Header closeButton>
          <Modal.Title>Confirming User</Modal.Title>
          { confirmUserRequest.requesting && <p>You confirmation is on progress</p>}
          { !confirmUserRequest.requesting && confirmUserRequest.success && <p>You confirmation is complete</p>}
          { !confirmUserRequest.requesting && !confirmUserRequest.success && <p>You confirmation ended in an error</p>}
        </Modal.Header>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUser);
