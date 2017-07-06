import React from "react";
import { NavLink as Link } from "react-router-dom";

let configurationCollapsed = false;
let othersCollapsed = false;
const configurationMenus = [
  {
    menu: "IMP Commission Setup",
    link: "admin/dashboard/commission"
  },
  {
    menu: "Email Template",
    link: "admin/dashboard/email/template"
  },
  {
    menu: "Email Service Setup",
    link: "admin/dashboard/email/service"
  },
  {
    menu: "Cloudinary Settings",
    link: "admin/dashboard/cloudinary"
  },
  {
    menu: "Google Analytics",
    link: "admin/dashboard/analytics"
  },
  {
    menu: "Role",
    link: "admin/dashboard/roles"
  },
  {
    menu: "Logs",
    link: "admin/dashboard/logs"
  },
  {
    menu: "Feature Setting",
    link: "admin/dashboard/features"
  }
];

const SideNavigation = () => {
  const menuToShow = configurationMenus.map(menuItem => {
    return (
      <li key={menuItem.link}>
        <Link to={`/${menuItem.link}`}>
          <span>{menuItem.menu}</span>
        </Link>
      </li>
    );
  });
  return (
    <nav>
      <li>
        <Link to="/admin/dashboard">
          <i className="icon-speedometer" />

          <span>Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/admin/dashboard/users">
          <i className="icon-person-stalker" />
          <span>Users</span>
        </Link>
      </li>
      <li
        data-toggle="collapse"
        data-target="#configuration"
        className={configurationCollapsed ? "active" : "collapsed active"}
      >
        <a
          href="#"
          onClick={() => {
            configurationCollapsed = !configurationCollapsed;
          }}
        >
          <i className="icon-ios-gear-outline" />

          <span>Settings</span>
        </a>
        <ul
          className={configurationCollapsed ? "collapse in" : "collapse"}
          id="configuration"
        >
          {menuToShow}
        </ul>
      </li>
      <li>
        <Link to="/admin/dashboard/agents">
          <i className="icon-person-stalker" />
          <span>IMP's</span>
        </Link>
      </li>

    </nav>
  );
};

export default SideNavigation;
