import React from "react";
import NavLink from "react-router-dom/NavLink";

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
        <NavLink to={`/${menuItem.link}`}>
          <span className={menuItem.icon} />
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
