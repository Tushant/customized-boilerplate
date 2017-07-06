/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from "react";
import Helmet from "react-helmet";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  makeSelectLocation,
  makeSelectDialog,
  selectInitialize
} from "containers/App/selectors";
import Login from "containers/Login";
import Register from "containers/Register";
import { showDialog } from "containers/App/actions";
import { selectLoginRequest } from "containers/Login/selectors";
import Navbar from "components/Navbar";
import Header from "components/Header";
import Destination from "components/Destination";
import SearchDestination from "components/SearchDestination";
import Advertise from "components/Advertise";
import Listing from "components/Listing";
import Book from "components/Book";
import Footer from "components/Footer";
import { logout } from "containers/Login/actions";

const mapDispatchToProps = dispatch => ({
  showDialog: dialog => dispatch(showDialog(dialog)),
  hideDialog: () => dispatch(showDialog(null)),
  logout: () => dispatch(logout())
  // loginRequest: data => dispatch(loginRequest(data))
});

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  initialize: selectInitialize(),
  dialog: makeSelectDialog()
});

class HomePage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
  }

  render() {
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            {
              name: "description",
              content: "A React.js Boilerplate application homepage"
            }
          ]}
        />
        <Header />
        <SearchDestination />
        <Destination />
        {this.props.dialog}
        <Listing />
        <Book />
      </article>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
