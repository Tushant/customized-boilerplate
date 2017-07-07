import React from "react";
import NavLink from "react-router-dom/NavLink";

const sideMenus = [
  {
    menu: "My Hotel",
    link: "agent/dashboard/my-hotels"
  },
  {
    menu: "My Agents",
    link: "agent/dashboard/my-agents"
  },
  {
    menu: "Settings",
    link: "agent/dashboard/settings"
  }
];

const SideNavigation = () => {
  const menuToShow = sideMenus.map(menuItem => {
    return (
      <li key={menuItem.link}>
        <NavLink to={`/${menuItem.link}`}>
          <span>{menuItem.menu}</span>
        </NavLink>
      </li>
    );
  });
  return (
    <nav>
      <li>
        <NavLink to="/agent/dashboard">
          <i className="icon-speedometer" />
          <span>Dashboard</span>
        </NavLink>
      </li>
      <ul>
        {menuToShow}
      </ul>
    </nav>
  );
};

export default SideNavigation;
