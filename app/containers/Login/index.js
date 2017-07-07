import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Modal from "react-bootstrap/lib/Modal";
import { loginRequest } from "./actions";
import { showDialog } from "containers/App/actions";
import { selectLoginRequest } from "./selectors";
// import { selectSignupRequest } from "../Register/selectors";
import ForgotPassword from "./ForgotPassword";
import Register from "containers/Register";
import PropTypes from "prop-types";
import Validator from "validator";
import isEmpty from "lodash/isEmpty";
import ReCAPTCHA from "react-google-recaptcha";

const validateInput = data => {
  let errors = {};

  if (Validator.isEmpty(data.username)) {
    errors.username = "This field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "This field can not be empty";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const mapDispatchToProps = dispatch => ({
  loginRequest: values => dispatch(loginRequest(values)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog("null"))
});

const mapStateToProps = createStructuredSelector({
  userLoginRequest: selectLoginRequest()
  // userSignupRequest: selectSignupRequest(),
});

class LoginContainer extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    loginRequest: PropTypes.func.isRequired
  };
  state = {
    credentials: {
      username: "",
      password: ""
    },
    reCaptcha: "",
    showCaptcha: false,
    err: null,
    errors: {},
    isLoading: false,
    remember_me: false
  };

  componentWillReceiveProps(nextProps) {
    let err = nextProps.userLoginRequest.get("errors");
    this.setState({
      isLoading: false
    });
    if (err && err.size > 0) {
      let error = err.get("body").data;
      if (
        error.captcha_enable ||
        error.message === "Bot detected. Access Denied."
      )
        this.setState({
          showCaptcha: true
        });
    }
  }

  isValid = () => {
    const { errors, isValid } = validateInput(this.state.credentials);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  handleRememberMe = () => {
    this.setState({ remember_me: !this.state.remember_me });
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      if (this.state.showCaptcha) {
        this.props.loginRequest(
          Object.assign(
            {},
            { ...this.state.credentials, reCaptcha: this.state.reCaptcha }
          )
        );
      } else {
        this.props.loginRequest(Object.assign({}, this.state.credentials));
      }
    }
  };

  onChange = e => {
    console.log("Recaptcha", e);
    this.setState({
      reCaptcha: e
    });
  };

  render() {
    const { errors, credentials, isLoading, showCaptcha } = this.state;
    const { userLoginRequest } = this.props;
    let notice = null;

    let err = userLoginRequest.get("errors");
    if (err && err.size > 0) {
      let error = err.get("body").data;
      notice = error.message
        ? <p className="alert alert-danger">{error.message}</p>
        : <p className="alert alert-danger">{error}</p>;
    }

    return (
      <Modal show onHide={() => this.props.hideDialog()}>
        <Modal.Header closeButton>
          <Modal.Title>
            Login

          </Modal.Title>
        </Modal.Header>
        {notice && notice}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-block">
            <input
              type="text"
              name="username"
              value={credentials.username}
              className="form-control "
              placeholder="Username"
              onChange={this.handleChange}
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="form-group form-block">
            <input
              type="password"
              name="password"
              value={credentials.password}
              className="form-control "
              placeholder="Password"
              onChange={this.handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          {showCaptcha &&
            <ReCAPTCHA
              ref="reCaptcha"
              sitekey="6LfUDCcUAAAAANoaITqPr5ULqb6pZRcewBBSvnxj"
              onChange={this.onChange}
            />}
          <p>
            <a
              tabIndex=""
              onClick={() => this.props.showDialog(<ForgotPassword />)}
              className="frgt-pswd"
            >
              Forgot Password ?
            </a>
          </p>

          <button
            id="btnSubmit"
            className="btn btn-default btn-block btn-lg"
            type="submit"
            disabled={isLoading}
          >
            Login to Xceltrip
          </button>
        </form>
        <Modal.Footer>
          <div className="row">
            <div className="col-md-8">
              <p className="ta-l">
                Don't have an account ?{" "}
                <a
                  tabIndex=""
                  className="btn-gst"
                  onClick={() => this.props.showDialog(<Register />)}
                >
                  Sign Up
                </a>
              </p>
            </div>
            <div className="col-md-4 col-md-offset-2" />
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
