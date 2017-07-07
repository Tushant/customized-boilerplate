import React from "react";
import NavLink from "react-router-dom/NavLink";

const sideMenus = [
  {
    menu: "Dashboard",
    link: "agent/dashboard",
    image: require("assets/img/box.svg")
  },
  {
    menu: "My Hotel",
    link: "agent/dashboard/my-hotels",
    image: require("assets/img/box.svg")
  },
  {
    menu: "My Agents",
    link: "agent/dashboard/my-agents",
    image: require("assets/img/box.svg")
  },
  {
    menu: "Settings",
    link: "agent/dashboard/settings",
    image: require("assets/img/box.svg")
  }
];

const SideNavigation = () => {
  const menuToShow = sideMenus.map(menuItem => {
    return (
      <li key={menuItem.link}>
        <NavLink to={`/${menuItem.link}`}>
          <img src={menuItem.image} alt="dashboard" />
          <span>{menuItem.menu}</span>
        </NavLink>
      </li>
    );
  });
  return (
    <nav>
      <ul>
        {menuToShow}
      </ul>
    </nav>
  );
};

export default SideNavigation;