import React from "react";
import { Helmet } from "react-helmet";

const SideNavTheme = ({ theme, settings }) => {

  function darkHoverStyle() {
    return theme.palette.type === "dark"
      ? `.navigation .nav-item:hover,
        .navigation .nav-item.active {
          color: ${theme.palette.text.primary};
        }`
      : "";
  }

  function lightHoverStyle() {
    return theme.palette.type === "light"
      ? `.navigation .nav-item:hover,
        .navigation .nav-item.active,
        .navigation .submenu {
          background: rgba(0, 0, 0, .08);
        }`
      : "";
  }

  return (
    <Helmet>
      <style>
        {`
        ${
          theme.palette.type === "dark"
            ? `.sidenav {
          color: ${theme.palette.text.secondary};}` : " "
        }

        .navigation .nav-item:not(.badge) {
          color: ${theme.palette.text.primary};
        }
        
        .navigation .nav-item .icon-text::after {
          background: ${theme.palette.text.primary};
        }
       
        .item-icon {
          color: ${theme.palette.navbar.navigation.icon};
        }

        .brand__text {
          color: ${theme.palette.navbar.brand.text};
        }

        .item-arrow {
          color: ${theme.palette.navbar.navigation.text};
        }

        .item-text  {
          color: ${theme.palette.navbar.navigation.text};
        }

        ${darkHoverStyle()}
        
      `}
      </style>
    </Helmet>
  );
};

export default SideNavTheme;
