import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Helmet from "react-helmet";
import { Router, Switch } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";
import SideNavigation from "./components/SideNavigation";
import Routes from "./Routes";

import { makeSelectLocation } from "containers/App/selectors";
import { makeSelectUser } from "containers/App/selectors";
import { logout } from "containers/LoginContainer/actions";
import { resendConfirmationRequest } from "containers/Register/ConfirmUser/actions";
import "./component.css";

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  resendConfirmation: () => {
    console.log("resend confirmation called");
    return dispatch(resendConfirmationRequest());
  }
});

class UserDashboard extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      username: "",
      isConfirmed: false
    };
  }
  componentDidMount() {
    let username;
    const { user } = this.props;
    const userObject = JSON.parse(localStorage.getItem("user")).userInfo;
    const userInfo = user && user.get("userInfo");
    if (userInfo) {
      const first_name = userInfo["first_name"];
      const last_name = userInfo["last_name"];
      username = first_name + last_name;
      this.setState({ username: username });
      this.setState({ isConfirmed: userInfo["confirmed"] });
    } else {
      username = userObject["first_name"] + " " + userObject["last_name"];
      this.setState({ username: username });
      this.setState({ isConfirmed: userInfo["confirmed"] });
    }
  }

  resendConfirmation = () => {
    this.props.resendConfirmation();
  };
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - XcelTrip| User Dashboard"
          defaultTitle="XcelTrip | User Dashboard"
          meta={[
            { name: "description", content: "User Dashboard for XcelTrip" }
          ]}
        />
        <TopNavigation
          username={this.state.username}
          handleLogout={this.handleLogout}
        />
        <main>
          <SideNavigation />
          {!this.state.isConfirmed &&
            <div className="alert alert-warning alert-sticky">
              You are not confirmed yet.
              <span
                className="btn btn-primary"
                onClick={this.resendConfirmation}
              >
                Resend Email
              </span>
            </div>}
          <Routes />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
