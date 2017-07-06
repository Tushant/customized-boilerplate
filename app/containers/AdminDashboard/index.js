import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Helmet from "react-helmet";
import { Router, Switch } from "react-router-dom";
import TopNavigation from "./components/TopNavigation/navbar";
import SideNavigation from "./components/SideNavigation";
import Routes from "./Routes";

import { makeSelectLocation } from "containers/App/selectors";
import { selectCloudinary } from "./containers/Cloudinary/selectors";
import { loadInitialData } from "containers/App/actions";
import { logout } from "containers/Login/actions";
import "assets/css/bootstrap.css";
import "assets/css/app.css";
import "./component.css";

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation()
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
  componentDidMount() {
    let username;
    const userObject = JSON.parse(localStorage.getItem("user")).userInfo;
    const userInfo = user.get("userInfo");
    if (!userInfo.size === 0) {
      const first_name = userInfo["first_name"];
      const last_name = userInfo["last_name"];
      username = first_name + last_name;
      this.setState({ username: username });
    } else {
      username = userObject["first_name"] + " " + userObject["last_name"];
      this.setState({ username: username });
    }
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - XcelTrip| Admin Dashboard"
          defaultTitle="XcelTrip | Admin Dashboard"
          meta={[
            { name: "description", content: "Admin Dashboard for XcelTrip" }
          ]}
        />
        <TopNavigation
          username={this.state.username}
          handleLogout={this.handleLogout}
        />
        <main>
          <SideNavigation />
          <Routes />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
