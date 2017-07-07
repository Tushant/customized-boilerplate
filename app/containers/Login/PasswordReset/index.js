import React from "react";
import Modal from "react-bootstrap/lib/Modal";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { showDialog } from "containers/App/actions";
import { selectPasswordResetRequest } from "./selectors";
import { passwordResetRequest, newPasswordRequest } from "./actions";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";

const validateInput = data => {
  let errors = {};

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "This field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "This field can not be empty";
  }
  if (!Validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const mapStateToProps = createStructuredSelector({
  confirmPasswordReset: selectPasswordResetRequest()
});

const mapDispatchToProps = dispatch => ({
  hideDialog: () => dispatch(showDialog("null")),
  showDialog: dialog => dispatch(showDialog(dialog)),
  passwordReset: userId => dispatch(passwordResetRequest(userId)),
  newPassword: password => dispatch(newPasswordRequest(password))
});

class PasswordReset extends React.PureComponent {
  state = {
    newPassword: "",
    confirmPassword: "",
    error: "",
    isLoading: false,
    errors: {}
  };

  componentDidMount() {
    const userid = this.props.match.params.userid;
    let success = this.props.passwordReset(userid);
    console.log("success", success);
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps1", nextProps);
    console.log("componentWillReceiveProps2", this.props);
    this.setState({ isLoading: false });
  }
  isValid = () => {
    const { errors, isValid } = validateInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      let success = this.props.newPassword(
        Object.assign(
          {},
          {
            password: this.state.newPassword,
            token: this.props.confirmPasswordReset.messages.data.token
          }
        )
      );
      console.log("post new password ", success);
    }
  };

  render() {
    const { confirmPasswordReset } = this.props;
    const { isLoading, errors, newPassword, confirmPassword } = this.state;
    console.log("password-reset", confirmPasswordReset);
    return (
      <Modal className="modal-sm" show onHide={() => this.props.hideDialog()}>
        <Modal.Header closeButton>
          <Modal.Title>Password Reset Verification</Modal.Title>
        </Modal.Header>

        {confirmPasswordReset &&
          confirmPasswordReset.errors &&
          confirmPasswordReset.errors.alert_message &&
          <p>{confirmPasswordReset.errors.data}</p>}
        {confirmPasswordReset &&
          confirmPasswordReset.messages &&
          confirmPasswordReset.messages.data &&
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Enter new password: </label>
              <input
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={this.handleChange}
              />
              {errors.newPassword && <p>{errors.newPassword}</p>}
            </div>
            <div>
              <label>Confirm password: </label>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={this.handleChange}
              />
              {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            </div>
            <button type="submit" disabled={isLoading}>
              Submit
            </button>
          </form>}
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
