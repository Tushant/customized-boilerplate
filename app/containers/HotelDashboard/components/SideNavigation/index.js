import React from "react";
import { Link } from "react-router-dom";

const sideMenus = [
  { menu: "Basic Information", link: "hotel/dashboard/content" },
  { menu: "List Hotel", link: "hotel/dashboard/list/hotel" }
];

const SideNavigation = () => {
  const menuToShow = sideMenus.map(menuItem => {
    return (
      <li key={menuItem.link}>
        <Link to={`/${menuItem.link}`}><span>{menuItem.menu}</span></Link>
      </li>
    );
  });
  return (
    <nav>
      {menuToShow}
    </nav>
  );
};

export default SideNavigation;
