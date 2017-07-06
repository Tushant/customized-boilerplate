import React from "react";
import { Link } from "react-router-dom";

const sideMenus = [
  {
    menu: "Dashboard",
    link: "user/dashboard/home",
    icon: "icon-dashboard"
  },
  {
    menu: "Appy For Agent",
    link: "user/dashboard/apply_for_agent",
    icon: "icon-agent"
  }
];

const SideNavigation = () => {
  const menuToShow = sideMenus.map(menuItem => {
    return (
      <li key={menuItem.link}>
        <Link to={`/${menuItem.link}`}>
          <span className={menuItem.icon}></span>
          <span>{menuItem.menu}</span>
        </Link>
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
