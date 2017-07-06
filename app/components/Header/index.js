import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import stay from "assets/img/destination/stay.svg";
import fly from "assets/img/destination/fly.svg";
import ride from "assets/img/destination/ride.svg";

import messages from "./messages";

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="container masthead">
        <h1>
          <span className="number-lg">4.3M</span>Xceltripers<br /> Worldwide
        </h1>

        <div className="row">
          <div className="col-md-4">
            <img src={stay} />
            <h2>Stay</h2>

            <p className="faded">
              Where to stay? Just search over thousands of hotels with Xceltrip.
            </p>
          </div>
          <div className="col-md-4">

            <img src={fly} />
            <h2>Fly</h2>

            <p className="faded">
              Where to stay? Just search over thousands of hotels with Xceltrip.
            </p>

          </div>
          <div className="col-md-4">
            <img src={ride} />
            <h2>Ride</h2>

            <p className="faded">
              Where to stay? Just search over thousands of hotels with Xceltrip.
            </p>

          </div>
        </div>
      </div>
    );
  }
}

export default Header;
