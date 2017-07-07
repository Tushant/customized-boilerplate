import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { showDialog } from "containers/App/actions";
import { selectForgotPasswordRequest } from "./selectors";
import { forgotPasswordRequest } from "./actions";
import Login from "containers/Login";
import forgotImg from "assets/img/forgot.svg";

const mapStateToProps = createStructuredSelector({
  confirmForgotPassword: selectForgotPasswordRequest()
});

const mapDispatchToProps = dispatch => ({
  hideDialog: () => dispatch(showDialog("null")),
  showDialog: dialog => dispatch(showDialog(dialog)),
  // handleForgotPassword: (username) => dispatch(forgotPassword(username)),
  forgotPassword: userEmail => dispatch(forgotPasswordRequest(userEmail))
});

class ForgotPassword extends React.PureComponent {
  state = {
    email: "",
    error: {},
    message: {}
  }; // added _id for put request

  componentWillReceiveProps(nextProps) {
    let messages = nextProps.confirmForgotPassword.messages;

    let err = nextProps.confirmForgotPassword.errors;

    debugger;
    if (
      messages &&
      messages.hasOwnProperty("data") &&
      messages.status === 200
    ) {
      this.setState({ error: {}, message: messages });
    } else {
      this.setState({ error: err, message: {} });
    }
  }
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(
      "submitting. here we dispatch the given email to handleForgotPassword",
      this.props.forgotPassword
    );
    let success = this.props.forgotPassword(this.state);
    console.log("forgot password status", success);
  };

  render() {
    return (
      <Modal show onHide={() => this.props.hideDialog()} className="modal-sm">
        <Modal.Header closeButton />
        {this.state.error.data &&
          <p className="alert alert-danger">{this.state.error.data}</p>}
        {this.state.message.data &&
          <p className="alert alert-success">{this.state.message.data}</p>}
        <img src={forgotImg} alt="forgot" style={{ width: "72px" }} />
        <h1>Reset Your Password</h1>
        <p>
          Don’t worry! Just fill in your email and we’ll send you a password reset link.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="email"
              name="email"
              className="form-control "
              placeholder="Email"
              required
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group form-block clearfix">
            <div className="pull-right">
              <a
                tabIndex=""
                onClick={() => this.props.showDialog(<Login />)}
                className="btn btn-link"
              >
                Return to login
              </a>
              <button type="submit" className="btn btn-default">Submit</button>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
