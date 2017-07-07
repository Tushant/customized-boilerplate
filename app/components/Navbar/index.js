import React from "react";
import Link from "react-router-dom/Link";

import Logo from "assets/img/logo.svg";

let isDroppedDown = false;
const Navbar = ({ user, menus, userForm, handleLogout }) => {
  return (
    <div className="" id="top" role="banner">
      <div id="header" className="container">
        <Link to="/"><img src={Logo} alt="xceltrip" className="logo" /></Link>
        <nav className="nav navbar-nav navbar-right" role="navigation">
          <ul>
            <li>
              <a onClick={() => userForm("signup")} tabIndex="">Sign Up</a>
            </li>
            <li>
              {user
                ? <a onClick={() => handleLogout()} tabIndex="">Logout</a>
                : <a onClick={() => userForm("login")} tabIndex="">Sign In</a>}
            </li>
            <li id="view_help" style={{ float: "left" }} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
