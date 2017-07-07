/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from "react";

import messages from "./messages";

import radar from "assets/img/radar.jpg";
import "./component.css";

const NotFound = props => {
  return (
    <div className="container">
      <div
        className="text-center box-center"
        style={{ maxWidth: "408px", margin: "0 auto" }}
      >
        <img src={radar} alt="radar" className="img-responsive" />
        <h1 className="thin">
          The page you are looking for
          is not under our radar.
        </h1>
        <button className="btn btn-link" href="javascript:history.back()">
          Move Back
        </button>
      </div>
      <div className="sticky-btm-right">
        <span className="text-xlg bold dim-1">404</span>
      </div>
    </div>
  );
};

export default NotFound;
