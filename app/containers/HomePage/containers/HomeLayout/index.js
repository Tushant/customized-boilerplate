import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
  makeSelectLocation,
  makeSelectDialog,
  selectInitialize
} from "containers/App/selectors";
import { showDialog } from "containers/App/actions";
import { selectLoginRequest } from "containers/Login/selectors";
import { logout } from "containers/Login/actions";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Login from "containers/Login";
import Register from "containers/Register";
import "assets/css/bootstrap.css";
import "assets/css/app.css";

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null)),
  logout: () => dispatch(logout())
});

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  initialize: selectInitialize(),
  dialog: makeSelectDialog()
});

class HomeLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }
  componentDidMount() {
    const userObject = JSON.parse(localStorage.getItem("user"));
    this.setState({
      isLoggedIn: userObject ? userObject.success : false
    });
  }
  componentWillReceiveProps(nextProps) {
    const userObject = JSON.parse(localStorage.getItem("user"));
    this.setState({
      isLoggedIn: userObject ? userObject.success : false
    });
  }
  // eslint-disable-line react/prefer-stateless-function
  handleDialog = form => {
    const dialog = form === "login"
      ? <Login onClose={() => this.props.hideDialog(null)} />
      : <Register onClose={() => this.props.hideDialog(null)} />;
    this.props.showDialog(dialog);
  };

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Navbar
          userForm={this.handleDialog}
          user={this.state.isLoggedIn}
          handleLogout={this.handleLogout}
        />
        {this.props.dialog}
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
