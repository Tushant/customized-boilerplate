import React from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import { signupRequest } from "./actions";
import { showDialog } from "containers/App/actions";
import { selectSignupRequest } from "./selectors";
import Login from "containers/Login";

import child from "assets/img/child.jpg";

const mapDispatchToProps = dispatch => ({
  signupRequest: values => dispatch(signupRequest(values)),
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog("null"))
});

const mapStateToProps = createStructuredSelector({
  userSignupRequest: selectSignupRequest()
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        agree_terms_condition: false,
        email_offer_subscription: false
      },
      errors: {},
      show_password: false
    };
  }

  handlePasswordChecked = () =>
    this.setState({ show_password: !this.state.show_password });

  handleTermsChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        agree_terms_condition: !this.state.user.agree_terms_condition
      }
    });
  };

  handleSubscribtionChecked = () => {
    this.setState({
      user: {
        ...this.state.user,
        email_offer_subscription: !this.state.user.email_offer_subscription
      }
    });
  };

  handleChange = e => {
    const fieldName = e.target.name;
    const label = e.target.placeholder;
    this.setState(
      {
        user: { ...this.state.user, [e.target.name]: e.target.value }
      },
      () => {
        this.validateField([{ label: label, fieldName: fieldName }]);
      }
    );
  };

  validateField = validate => {
    const errors = { ...this.state.errors };
    let hasError = false;
    validate.forEach(field => {
      const name = field["fieldName"];
      if (this.state.user[name].length === 0) {
        hasError = true;
        const label = field["label"];
        errors[name] = `${label} can't be empty`;
      } else {
        errors[name] = "";
      }
    });
    this.setState({ errors });
    return !hasError;
  };

  handleBlur = event => {
    const fieldName = event.target.name;
    const label = event.target.placeholder;
    console.log("fieldName", fieldName, label);
    this.validateField([{ label: label, fieldName: fieldName }]);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (
      this.validateField([
        { label: "First Name", fieldName: "first_name" },
        { label: "Last Name", fieldName: "last_name" },
        { label: "Email", fieldName: "email" },
        { label: "Password", fieldName: "password" }
      ])
    ) {
      this.props.signupRequest(this.state.user);
    }
  };

  render() {
    const { show_password, user, errors } = this.state;
    return (
      <Modal className="modal-md" show onHide={() => this.props.hideDialog()}>
        <div className="row">
          <div className="col-md-8">
            <Modal.Header closeButton>
              <Modal.Title>
                Just A Step Away.
              </Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group form-block">
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  className="form-control "
                  placeholder="First Name"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="text-danger">
                  {errors && errors.first_name}
                </span>
              </div>
              <div className="form-group form-block">
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  className="form-control "
                  placeholder="Last Name"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="text-danger">
                  {errors && errors.last_name}
                </span>
              </div>
              <div className="form-group form-block">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  className="form-control "
                  placeholder="Email"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="text-danger">{errors && errors.email}</span>
              </div>
              <div className="form-group form-block">
                <input
                  type={show_password ? "text" : "password"}
                  name="password"
                  value={user.password}
                  className="form-control"
                  placeholder="Password"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span className="text-danger">{errors && errors.password}</span>
              </div>
              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    required="required"
                    onChange={this.handleTermsChecked}
                    checked={user.agree_terms_condition}
                  />
                  <span className="custom-control-indicator" />

                  {" "}
                  <span className="custom-control-description">
                    I agree the terms and conditions.
                  </span>

                  {" "}
                  <a href="terms.html">Learn more</a>
                </label>
              </div>

              <div className="form-group">
                <label className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    type="checkbox"
                    onChange={this.handleSubscribtionChecked}
                    checked={user.email_offer_subscription}
                  />
                  <span className="custom-control-indicator" />

                  {" "}
                  <span className="custom-control-description">

                    Subscribe for newsletter
                  </span>
                  {" "}
                  <a href="terms.html">Learn more</a>
                </label>
              </div>
              <button
                id="btnSubmit"
                className="btn btn-default btn-block btn-lg"
                type="submit"
                disabled={
                  !user.first_name ||
                    !user.last_name ||
                    !user.email ||
                    !user.password ||
                    !user.agree_terms_condition
                }
              >
                Join Now
              </button>
            </form>

            <Modal.Footer>

              <p className="ta-l">
                Already a Member?{" "}
                <a
                  className="btn-gst"
                  tabIndex=""
                  onClick={() => this.props.showDialog(<Login />)}
                >
                  Login
                </a>
              </p>

            </Modal.Footer>

          </div>

          <div className="col-md-4">
            <h3 className="thin color-white pos-abs pad-20 mg-top-0">
              Make your travel experience awesome
            </h3>
            <img className="img-responsive" alt="child smiling" src={child} />
          </div>

        </div>

      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
