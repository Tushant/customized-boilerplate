import React from "react";
import classnames from "classnames";
import NavLink from "react-router-dom/NavLink";
import Logo from "assets/img/logo.png";
import ProfilePic from "assets/img/noProfile.svg";

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
            <img src={ProfilePic} />
            {" "}
            {username && username}
            {" "}
          </a>
          <ul className="dropdown-menu">
            {/*<li><NavLink to="/agent/dashboard/home">Favourites</NavLink></li>*/}
            <li><NavLink to="/agent/dashboard/settings">Profile</NavLink></li>
            <li />
            <li><a onClick={() => handleLogout()}>Sign out</a></li>
          </ul>
        </li>
      </ul>
    </header>
  );
};

export default TopNavigation;
