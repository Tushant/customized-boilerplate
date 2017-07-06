import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Helmet from "react-helmet";
import Routes from "./Routes";

import TopNavigation from "./components/TopNavigation/navbar";
import SideNavigation from "./components/SideNavigation";
import { makeSelectLocation, makeSelectUser } from "containers/App/selectors";
import { logout } from "containers/LoginContainer/actions";
import "./component.css";

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUser()
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

class HotelDashboard extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      username: ""
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
          titleTemplate="%s - XcelTrip| HotelOwner Dashboard"
          defaultTitle="XcelTrip | HotelOwner Dashboard"
          meta={[
            {
              name: "description",
              content: "HotelOwner Dashboard for XcelTrip"
            }
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

export default connect(mapStateToProps, mapDispatchToProps)(HotelDashboard);
