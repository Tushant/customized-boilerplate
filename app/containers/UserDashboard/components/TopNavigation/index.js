import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import Logo from "assets/img/logo.svg";

let isDroppedDown = false;
const TopNavigation = ({ username, handleLogout }) => {
  return (
    <header className="clearfix">
<img src={Logo} alt="xceltrip" className="logo logo-sm" />
      <ul className="nav navbar-nav navbar-right">
        <li className={classnames("dropdown ", { open: isDroppedDown })}>
          <a
            href="#"
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={() => {
              isDroppedDown = !isDroppedDown;
            }}
          >

            {" "}
            {username && username}
            {" "}
<i className="icon-chevron-down"></i>
          </a>
          <ul className="dropdown-menu">
            {/*<li><a href="#">Favourites</a></li>*/}
            <li><a href="#">Profile</a></li>
            <li />
            <li>
              <a onClick={() => handleLogout()}>
                Sign out
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default TopNavigation;
