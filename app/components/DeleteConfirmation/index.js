import React from "react";
import { Modal } from "react-bootstrap";

class DeleteConfirmation extends React.PureComponent {
  handleDelete(key) {
    console.log("key", key);
    this.props.onDelete(key);
    this.props.hideDialog();
  }

  render() {
    return (
      <Modal show onHide={() => this.props.hideDialog()} className="md-box">
        <h1>Are you sure want to delete?</h1>
        <div className="col-md-6">
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(this.props.deleteKey)}
          >
            Delete
          </button>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-success"
            onClick={() => this.props.hideDialog()}
          >
            Cancel
          </button>
        </div>
      </Modal>
    );
  }
}

export default DeleteConfirmation;
