import React from "react";
import { Modal } from "react-bootstrap";

class LogsDetail extends React.PureComponent {
  render() {
    const { log } = this.props;
    return (
      <Modal show onHide={() => this.props.hideDialog()} className="lg-box">
        <p>{log}</p>
      </Modal>
    );
  }
}

export default LogsDetail;
